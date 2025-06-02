# DEPRECATED - DO NOT USE
# This script was converting from v2 to v1, which is the wrong direction.
# The project uses @inertiajs/react v2.0.11
# Use update_inertia_imports.ps1 instead, which converts from v1 to v2.

# Original code commented out to prevent accidental use:
# $files = Get-ChildItem -Path 'resources\js' -Recurse -Include '*.tsx','*.ts','*.jsx','*.js'
#
# foreach ($file in $files) {
#     $content = Get-Content $file.FullName -Raw
#     if ($content -match '@inertiajs/react') {
#         # Replace basic imports
#         $content = $content -replace "import \{ ([^}]+) \} from '@inertiajs/react';", "import { `$1 } from '@inertiajs/inertia-react';"
#
#         # Replace server import
#         $content = $content -replace "from '@inertiajs/react/server'", "from '@inertiajs/inertia-react/server'"
#
#         Set-Content $file.FullName $content
#         Write-Host "Updated: $($file.FullName)"
#     }
# }
