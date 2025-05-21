<?php

return [
    'name' => 'AuditCompliance',

    /*
    |--------------------------------------------------------------------------
    | Audit Compliance Configuration
    |--------------------------------------------------------------------------
    |
    | This is the configuration for the Audit Compliance module.
    |
    */

    // Audit settings
    'audit' => [
        'enabled' => true,
        'purge_after_days' => 365, // Purge audit logs after 1 year
    ],

    // Compliance settings
    'compliance' => [
        'types' => [
            'system_access',
            'data_modification',
            'financial_transactions',
            'equipment_usage',
        ],
    ],

    // Data retention settings
    'data_retention' => [
        'periods' => [
            'financial' => 7, // 7 years for financial data
            'employee' => 5, // 5 years for employee data
            'equipment' => 10, // 10 years for equipment records
        ],
    ],
];
