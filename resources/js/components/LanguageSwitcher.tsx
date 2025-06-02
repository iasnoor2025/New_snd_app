/**
 * Language Switcher Component
 * Provides UI for switching between available locales
 */

import React, { useState } from 'react';
import { ChevronDown, Globe, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import useTranslation from '@/hooks/useTranslation';

interface LanguageSwitcherProps {
  variant?: 'default' | 'compact' | 'minimal';
  showFlag?: boolean;
  showLabel?: boolean;
  className?: string;
}

/**
 * Get flag emoji for locale
 */
function getFlagEmoji(locale: string): string {
  const flags: Record<string, string> = {
    'en': '🇺🇸',
    'ar': '🇸🇦',
    'hi': '🇮🇳',
    'bn': '🇧🇩',
    'ur': '🇵🇰'
  };

  return flags[locale] || '🌐';
}

export function LanguageSwitcher({
  variant = 'default',
  showFlag = true,
  showLabel = true,
  className
}: LanguageSwitcherProps) {
  const {
    locale,
    availableLocales,
    switchLocale,
    getDisplayName,
    isRTL,
    __
  } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const handleLocaleChange = async (newLocale: string) => {
    if (newLocale === locale || isLoading) return;

    setIsLoading(true);
    try {
      switchLocale(newLocale, true);
    } catch (error) {
      console.error('Failed to switch locale:', error);
    } finally {
      // Reset loading state after a delay to allow for page update
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  if (availableLocales.length <= 1) {
    return null;
  }

  const currentFlag = getFlagEmoji(locale);
  const currentDisplayName = getDisplayName(locale);
  const direction = isRTL() ? 'rtl' : 'ltr';

  if (variant === 'minimal') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 w-8 p-0",
              isLoading && "opacity-50 cursor-not-allowed",
              className
            )}
            disabled={isLoading}
          >
            <Globe className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {availableLocales.map((availableLocale) => (
            <DropdownMenuItem
              key={availableLocale}
              onClick={() => handleLocaleChange(availableLocale)}
              className={cn(
                "flex items-center justify-between cursor-pointer",
                availableLocale === locale && "bg-accent"
              )}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getFlagEmoji(availableLocale)}</span>
                <span>{getDisplayName(availableLocale)}</span>
              </div>
              {availableLocale === locale && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (variant === 'compact') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-8 px-2 text-xs",
              isLoading && "opacity-50 cursor-not-allowed",
              className
            )}
            disabled={isLoading}
            dir={direction}
          >
            {showFlag && <span className="mr-1">{currentFlag}</span>}
            <span className="uppercase font-medium">{locale}</span>
            <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          {availableLocales.map((availableLocale) => (
            <DropdownMenuItem
              key={availableLocale}
              onClick={() => handleLocaleChange(availableLocale)}
              className={cn(
                "flex items-center justify-between cursor-pointer",
                availableLocale === locale && "bg-accent"
              )}
            >
              <div className="flex items-center space-x-2">
                <span>{getFlagEmoji(availableLocale)}</span>
                <span className="uppercase text-xs font-medium">{availableLocale}</span>
              </div>
              {availableLocale === locale && (
                <Check className="h-3 w-3 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Default variant
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex items-center space-x-2",
            isLoading && "opacity-50 cursor-not-allowed",
            className
          )}
          disabled={isLoading}
          dir={direction}
        >
          {showFlag && <span className="text-lg">{currentFlag}</span>}
          {showLabel && <span>{currentDisplayName}</span>}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
          {__('Select Language')}
        </div>
        {availableLocales.map((availableLocale) => {
          const isCurrentLocale = availableLocale === locale;
          const isRTLLocale = isRTL(availableLocale);

          return (
            <DropdownMenuItem
              key={availableLocale}
              onClick={() => handleLocaleChange(availableLocale)}
              className={cn(
                "flex items-center justify-between cursor-pointer py-2",
                isCurrentLocale && "bg-accent"
              )}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{getFlagEmoji(availableLocale)}</span>
                <div className="flex flex-col">
                  <span className="font-medium">{getDisplayName(availableLocale)}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground uppercase">
                      {availableLocale}
                    </span>
                    {isRTLLocale && (
                      <Badge variant="secondary" className="text-xs px-1 py-0">
                        RTL
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              {isCurrentLocale && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitcher;
