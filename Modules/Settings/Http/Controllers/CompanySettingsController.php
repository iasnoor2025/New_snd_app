<?php

namespace Modules\Settings\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Artisan;

class CompanySettingsController extends Controller
{
    public function index()
    {
        // Get company settings from config file
        $settings = $this->getCompanySettings();

        return inertia('settings/company', [
            'name' => $settings['company_name'],
            'current_logo' => $settings['company_logo']
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Get current settings
        $settings = $this->getCompanySettings();

        // Update settings
        $settings['company_name'] = $request->name;

        // Handle logo upload if provided
        if ($request->hasFile('logo')) {
            // Delete old logo if exists
            if (isset($settings['company_logo'])) {
                $oldPath = str_replace('/storage', '', $settings['company_logo']);
                if (Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }

            $path = $request->file('logo')->store('company', 'public');
            $settings['company_logo'] = Storage::url($path);
        }

        // Save settings
        $this->saveCompanySettings($settings);

        // Clear all application caches to ensure new settings are picked up
        Cache::flush();
        Artisan::call('config:clear');
        Artisan::call('cache:clear');

        return redirect()->back()->with('success', 'Company settings updated successfully.');
    }

    protected function getCompanySettings(): array
    {
        // Try to get from cache first
        $settings = Cache::get('company_settings');

        if (!$settings) {
            // If not in cache, get from config file
            $settings = [
                'company_name' => config('company.company_name', 'SND Rental System'),
                'company_logo' => config('company.company_logo', '/images/logo.png'),
            ];

            // Cache the settings
            Cache::put('company_settings', $settings, now()->addDay());
        }

        return $settings;
    }

    protected function saveCompanySettings(array $settings)
    {
        // Update config file
        $content = "<?php\n\nreturn " . var_export($settings, true) . ";\n";
        file_put_contents(config_path('company.php'), $content);

        // Update runtime config
        foreach ($settings as $key => $value) {
            Config::set('company.' . $key, $value);
        }

        // Update cache
        Cache::put('company_settings', $settings, now()->addDay());

        // Update .env file with new company name
        $this->updateEnvFile('COMPANY_NAME', $settings['company_name']);
        // Also update the Vite variable
        $this->updateEnvFile('VITE_COMPANY_NAME', '${COMPANY_NAME}');
    }

    protected function updateEnvFile($key, $value)
    {
        $path = base_path('.env');

        if (file_exists($path)) {
            $escaped = preg_quote('=');
            $pattern = "/^{$key}{$escaped}.*$/m";

            // Ensure value is properly quoted if it contains spaces and isn't using variable interpolation
            if (!str_starts_with($value, '${') && strpos($value, ' ') !== false && !preg_match('/^".*"$/', $value)) {
                $value = '"' . str_replace('"', '\"', $value) . '"';
            }

            if (preg_match($pattern, file_get_contents($path))) {
                file_put_contents($path, preg_replace(
                    $pattern,
                    "{$key}={$value}",
                    file_get_contents($path)
                ));
            } else {
                file_put_contents($path, file_get_contents($path) . "\n{$key}={$value}\n");
            }
        }
    }
}


