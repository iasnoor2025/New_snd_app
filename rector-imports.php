<?php

declare(strict_types=1);

use Rector\Config\RectorConfig;
use Rector\PSR4\Rector\Namespace_\NormalizeNamespaceByPSR4ComposerAutoloadRector;

return static function (RectorConfig $rectorConfig): void {
    $rectorConfig->rule(NormalizeNamespaceByPSR4ComposerAutoloadRector::class);
    $rectorConfig->paths([
        __DIR__ . '/app',
        __DIR__ . '/Modules',
    ]);
    $rectorConfig->importNames();
    $rectorConfig->importShortClasses();
    $rectorConfig->autoloadPaths([
        __DIR__ . '/vendor/autoload.php',
    ]);
};
