<?php

require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Modules\Localization\Models\Language;

try {
    // Check if languages table exists and has data
    $count = Language::count();
    echo "Current language count: {$count}\n";

    if ($count == 0) {
        echo "Seeding languages...\n";

        // Create default languages
        $languages = [
            [
                'code' => 'en',
                'name' => 'English',
                'native_name' => 'English',
                'direction' => 'ltr',
                'enabled' => true,
                'is_default' => true,
                'completion_percentage' => 100,
                'flag_icon' => '🇺🇸',
                'sort_order' => 1
            ],
            [
                'code' => 'es',
                'name' => 'Spanish',
                'native_name' => 'Español',
                'direction' => 'ltr',
                'enabled' => true,
                'is_default' => false,
                'completion_percentage' => 80,
                'flag_icon' => '🇪🇸',
                'sort_order' => 2
            ],
            [
                'code' => 'fr',
                'name' => 'French',
                'native_name' => 'Français',
                'direction' => 'ltr',
                'enabled' => true,
                'is_default' => false,
                'completion_percentage' => 75,
                'flag_icon' => '🇫🇷',
                'sort_order' => 3
            ]
        ];

        foreach ($languages as $language) {
            Language::create($language);
            echo "Created language: {$language['name']}\n";
        }

        echo "Languages seeded successfully!\n";
    } else {
        echo "Languages already exist:\n";
        foreach (Language::all() as $lang) {
            echo "- {$lang->code}: {$lang->name} (enabled: " . ($lang->enabled ? 'yes' : 'no') . ")\n";
        }
    }

} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Stack trace: " . $e->getTraceAsString() . "\n";
}
