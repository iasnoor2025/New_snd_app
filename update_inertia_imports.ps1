# Update Inertia.js imports from v1 to v2
$files = Get-ChildItem -Path 'resources\js' -Recurse -Include '*.tsx','*.ts','*.jsx','*.js'

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match '@inertiajs/inertia-react') {
        # Replace basic imports
        $content = $content -replace "import \{ ([^}]+) \} from '@inertiajs/inertia-react';", "import { `$1 } from '@inertiajs/react';"

        # Replace server import
        $content = $content -replace "from '@inertiajs/inertia-react/server'", "from '@inertiajs/react/server'"

        Set-Content $file.FullName $content
        Write-Host "Updated: $($file.FullName)"
    }
}
