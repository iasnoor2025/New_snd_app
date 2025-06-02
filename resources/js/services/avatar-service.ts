import { createHash } from 'crypto';

export interface AvatarOptions {
  size?: number;
  defaultType?: 'mp' | 'identicon' | 'monsterid' | 'wavatar' | 'retro' | 'robohash' | 'blank';
  rating?: 'g' | 'pg' | 'r' | 'x';
  forceDefault?: boolean;
}

export interface UserAvatarData {
  id: string | number;
  name: string;
  email?: string;
  avatar?: string;
  initials?: string;
}

export class AvatarService {
  private static instance: AvatarService;
  private cache = new Map<string, string>();
  private readonly GRAVATAR_BASE_URL = 'https://www.gravatar.com/avatar/';
  private readonly DICEBEAR_BASE_URL = 'https://api.dicebear.com/7.x';

  static getInstance(): AvatarService {
    if (!AvatarService.instance) {
      AvatarService.instance = new AvatarService();
    }
    return AvatarService.instance;
  }

  /**
   * Generate MD5 hash for email (used for Gravatar)
   */
  private generateEmailHash(email: string): string {
    if (typeof window !== 'undefined') {
      // Browser environment - use Web Crypto API
      return this.generateEmailHashBrowser(email);
    }
    // Node.js environment (SSR)
    return createHash('md5').update(email.toLowerCase().trim()).digest('hex');
  }

  /**
   * Generate email hash in browser environment
   */
  private generateEmailHashBrowser(email: string): string {
    // Simple MD5 implementation for browser
    // In production, you might want to use a proper crypto library
    const cleanEmail = email.toLowerCase().trim();
    let hash = 0;
    for (let i = 0; i < cleanEmail.length; i++) {
      const char = cleanEmail.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
  }

  /**
   * Get Gravatar URL for email
   */
  getGravatarUrl(email: string, options: AvatarOptions = {}): string {
    const {
      size = 80,
      defaultType = 'mp',
      rating = 'g',
      forceDefault = false
    } = options;

    const emailHash = this.generateEmailHash(email);
    const params = new URLSearchParams({
      s: size.toString(),
      d: defaultType,
      r: rating,
      ...(forceDefault && { f: 'y' })
    });

    return `${this.GRAVATAR_BASE_URL}${emailHash}?${params.toString()}`;
  }

  /**
   * Get DiceBear avatar URL (AI-generated avatars)
   */
  getDiceBearUrl(
    seed: string,
    style: 'avataaars' | 'big-smile' | 'bottts' | 'croodles' | 'fun-emoji' | 'icons' | 'identicon' | 'initials' | 'lorelei' | 'micah' | 'miniavs' | 'open-peeps' | 'personas' | 'pixel-art' | 'shapes' | 'thumbs' = 'initials',
    options: { size?: number; backgroundColor?: string; } = {}
  ): string {
    const { size = 80, backgroundColor } = options;
    const params = new URLSearchParams({
      seed: seed,
      size: size.toString(),
      ...(backgroundColor && { backgroundColor })
    });

    return `${this.DICEBEAR_BASE_URL}/${style}/svg?${params.toString()}`;
  }

  /**
   * Get initials from full name
   */
  getInitials(name: string): string {
    if (!name) return '?';

    const names = name.trim().split(' ');
    if (names.length === 0) return '?';
    if (names.length === 1) return names[0].charAt(0).toUpperCase();

    const firstInitial = names[0].charAt(0);
    const lastInitial = names[names.length - 1].charAt(0);

    return `${firstInitial}${lastInitial}`.toUpperCase();
  }

  /**
   * Generate a color based on user name or ID
   */
  generateAvatarColor(seed: string): string {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
      '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D2B4DE'
    ];

    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  }

  /**
   * Get the best avatar URL for a user
   */
  getUserAvatarUrl(user: UserAvatarData, options: AvatarOptions = {}): string {
    const cacheKey = `${user.id}-${JSON.stringify(options)}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    let avatarUrl: string;

    // Priority: custom avatar > gravatar > generated avatar
    if (user.avatar) {
      avatarUrl = user.avatar;
    } else if (user.email) {
      avatarUrl = this.getGravatarUrl(user.email, options);
    } else {
      // Generate avatar using DiceBear with user name as seed
      avatarUrl = this.getDiceBearUrl(user.name || user.id.toString(), 'initials', {
        size: options.size,
        backgroundColor: this.generateAvatarColor(user.name || user.id.toString())
      });
    }

    this.cache.set(cacheKey, avatarUrl);
    return avatarUrl;
  }

  /**
   * Preload avatar image
   */
  async preloadAvatar(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  /**
   * Clear avatar cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get avatar with fallback handling
   */
  async getAvatarWithFallback(user: UserAvatarData, options: AvatarOptions = {}): Promise<{
    url: string;
    fallback: string;
    color: string;
  }> {
    const avatarUrl = this.getUserAvatarUrl(user, options);
    const fallback = user.initials || this.getInitials(user.name);
    const color = this.generateAvatarColor(user.name || user.id.toString());

    // Try to preload the avatar
    const isLoaded = await this.preloadAvatar(avatarUrl);

    return {
      url: isLoaded ? avatarUrl : '',
      fallback,
      color
    };
  }
}

// Export singleton instance
export const avatarService = AvatarService.getInstance();
