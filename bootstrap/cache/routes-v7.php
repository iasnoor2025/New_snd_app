<?php

app('router')->setCompiledRoutes(
    array (
  'compiled' => 
  array (
    0 => false,
    1 => 
    array (
      '/sanctum/csrf-cookie' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'sanctum.csrf-cookie',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/up' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::Vid6rWqBDByzZuxX',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'home',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/dashboard' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'dashboard',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/modules_statuses.json' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::EsW180kFy5mblha2',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/settings' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::pEvqs1TFog64HGAK',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
            'POST' => 2,
            'PUT' => 3,
            'PATCH' => 4,
            'DELETE' => 5,
            'OPTIONS' => 6,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'api.settings',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        2 => 
        array (
          0 => 
          array (
            '_route' => 'api.settings.update',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/settings/profile' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'profile.edit',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'profile.update',
          ),
          1 => NULL,
          2 => 
          array (
            'PATCH' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        2 => 
        array (
          0 => 
          array (
            '_route' => 'profile.destroy',
          ),
          1 => NULL,
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/settings/password' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'password.edit',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'password.update',
          ),
          1 => NULL,
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/settings/appearance' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'appearance',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/register' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'register',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'generated::BQC6Q3SipwEas8ha',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/login' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'login',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'generated::qcCWdCbYmcSTcPiU',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/forgot-password' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'password.request',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'password.email',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/reset-password' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'password.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/verify-email' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'verification.notice',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/email/verification-notification' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'verification.send',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/confirm-password' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'password.confirm',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'generated::oAMGJCg4wjezSvob',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/logout' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'logout',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/leave-requests' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::2drJlNfAQ1YW20o6',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/timesheets' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::E2piQSzSIAiheUEI',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/projects' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::q85XyCvWpWKnvcXS',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'projects.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/rentals' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::MUN7kAYhUKbbRtDU',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/equipment' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::ODS63HExyrBw37Fq',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/payrolls' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::CikPFgExi2VvwzTs',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/localization' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::YfFbqoFNvZral77O',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/audit' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::unA71fKsGmqfxD2D',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/leaves' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::JgoRdrWuXktkFYUP',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/leave' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::JPyvMLFCRsa9crmm',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/v1/employees' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.employees.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'api.employees.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/v1/leaves' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.leaves.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'api.leaves.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/tokens' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.tokens.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'api.tokens.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/tokens/create' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.tokens.create',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/stats' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.stats',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/stats/usage' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.stats.usage',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/stats/endpoints' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.stats.endpoints',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/stats/export' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.stats.export',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/rate-limits' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.rate-limits',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'api.rate-limits.update',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/audit/audit' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'audit.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/audit/audit/dashboard' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'audit.dashboard',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/audit/audit/logs' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'audit.logs',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/audit/audit/reports' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'audit.reports',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/audit/audit/reports/activity' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'audit.reports.activity',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/audit/audit/reports/changes' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'audit.reports.changes',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/audit/audit/reports/user-activity' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'audit.reports.user-activity',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/audit/audit/reports/export' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'audit.reports.export',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/audit/audit/reports/generate' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'audit.reports.generate',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/audit/audit/compliance' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'audit.compliance',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/audit/audit/compliance/settings' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'audit.compliance.settings',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'audit.compliance.settings.update',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/audit/audit/compliance/alerts' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'audit.compliance.alerts',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/core' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::uXkkrt7KpPVRVLQn',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/users' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'users.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'users.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/settings/roles' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'roles.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'roles.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/settings/user-roles' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'roles.user-roles',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/core' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::42STzMHD0PvMwAxB',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/v1/positions' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.positions.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'api.positions.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/v1/timesheets' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.timesheets.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'api.timesheets.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/v1/departments' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.departments.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/v1/employee-documents' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.employee-documents.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'api.employee-documents.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/v1/employee-advances' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.employee-advances.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'api.employee-advances.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/v1/resignations' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.resignations.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'api.resignations.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/employeemanagements' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'employeemanagement.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'employeemanagement.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/employeemanagements/create' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'employeemanagement.create',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/employees' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'employees.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'employees.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/employees/create' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'employees.create',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/equipment/v1/equipment' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.equipment.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'api.equipment.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/equipment/v1/depreciation/dashboard' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::5g2K8KJjWCkFJY0y',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/equipment/v1/equipment/utilization/report' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::tTh4U7VduLeeyY9m',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/equipment/v1/maintenance' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'maintenance.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'maintenance.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/equipment/v1/maintenance-schedules' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'maintenance-schedules.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'maintenance-schedules.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/equipment/v1/maintenance-tasks' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'maintenance-tasks.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'maintenance-tasks.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/equipment/v1/maintenance-records' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'maintenance-records.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'maintenance-records.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/equipment/v1/technicians' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'technicians.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'technicians.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/equipment/equipment/equipment' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'equipment.equipment.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'equipment.equipment.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/equipment/equipment/equipment-availability' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'equipment.equipment.availability',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/equipment/equipment/equipment/create' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'equipment.equipment.create',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/equipment/equipment/maintenance/create' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'equipment.maintenance.create',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/equipment/equipment/maintenance' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'equipment.maintenance.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'equipment.maintenance.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/equipment/equipment/maintenance/inventory-items' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'equipment.maintenance.inventory-items',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/equipment/equipment/maintenance-schedule' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'equipment.maintenance.schedule',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/hr/leaves/requests' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::3WajEaUKFn2cM0xb',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'generated::VRk9BgvqXfmJRZBB',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/hr/leaves/balances' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::wNT1LbJcKqtl3NUE',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/hr/leaves/types' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::x4TSfjmJbONPjpyF',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/hr/leaves/calendar' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::ubVkTU68JQ08Yois',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/hr/leaves/leaves' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'leaves.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/hr/leaves/leaves/requests' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'leaves.requests.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'leaves.requests.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/hr/leaves/leaves/requests/create' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'leaves.requests.create',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/hr/leaves/leaves/approvals' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'leaves.approvals.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/hr/leaves/leaves/balances' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'leaves.balances.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/hr/leaves/leaves/types' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'leaves.types.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'leaves.types.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/hr/leaves/leaves/types/create' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'leaves.types.create',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/hr/leaves/leaves/reports' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'leaves.reports.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/hr/leaves/leaves/reports/generate' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'leaves.reports.generate',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/hr/leaves/leaves/reports/export' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'leaves.reports.export',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/hr/leaves/leaves/settings' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'leaves.settings.edit',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'leaves.settings.update',
          ),
          1 => NULL,
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/hr/leaves/leaves/leave-requests/create' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'leaves.leave-requests.create',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/hr/leaves/leaves/leave-requests' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'leaves.leave-requests.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/hr/payroll' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/hr/payroll/create' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.create',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/hr/payroll/salary-advances/create' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.salary-advances.create',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/hr/payroll/final-settlements/create' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.final-settlements.create',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/v1/projects' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::kNMO4G0EAgCHHPKb',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'generated::mvsPhikYKNIy5r98',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/projects/create' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'projects.create',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/projects/progress/demo' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'projects.progress.demo',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/rentals/customers' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.customers.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.customers.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/rentals/customers/create' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.customers.create',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/rentals/customers-report' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.customers.report',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/rentals/api/customers' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.api.customers',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/rentals/rentals' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/rentals/rentals/create' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.create',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/rentals/invoices' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.invoices.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.invoices.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/rentals/invoices/create' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.invoices.create',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/rentals/quotations' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.quotations.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.quotations.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/rentals/quotations/create' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.quotations.create',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/rentals/extensions' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.extensions.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.extensions.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/rentals/extensions/create' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.extensions.create',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/rentals/rental-timesheets' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.rental-timesheets.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/rentals/rentals-report' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.report',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/reports' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'reports.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/reports/clients' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'reports.clients',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/reports/rentals' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'reports.rentals',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/reports/invoices' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'reports.invoices',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/reports/payments' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'reports.payments',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/reports/equipment' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'reports.equipment',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/reports/revenue' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'reports.revenue',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/settings/settings' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'settings.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'settings.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/settings/settings/create' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'settings.create',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/settings/settings/company/logo' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'settings.company.logo',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/settings/settings/company/address' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'settings.company.address',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/settings/settings/company/contact' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'settings.company.contact',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/settings/settings/profile/avatar' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'settings.profile.avatar',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/settings/settings/admin/system' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'settings.admin.system',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'settings.admin.system.update',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/settings/settings/admin/backup' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'settings.admin.backup',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'settings.admin.backup.update',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/hr/timesheets/weekly-timesheets' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::W6IJj39GitjcxR1F',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'generated::quAWeZjxkUAp7wJ3',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/hr/timesheets/weekly-timesheets/current' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::AqKpW7Ef5euR37KB',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/hr/timesheets/time-entries' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::FJsKuJYbPIGXKs2f',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'generated::RRzLQDdgtedRyMY1',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/hr/timesheets/overtime-entries' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::DtcFDSwO1baeKHRX',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'generated::HXEeEzMQtwXgJmf0',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/hr/timesheets/approvals' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::xR0a5cbQhejNV4lm',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/hr/timesheets/reports/summary' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::wFEd4gu4zIQcgqym',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/hr/timesheets/reports/generate' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::qwpmO74DGVl6zqj5',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/hr/timesheets/calendar' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::vHZLmCBx7TNT8pGP',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/hr/timesheets/projects' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::ggAyMVJSI7VOpHHB',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/api/hr/timesheets/tasks' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::t3BsyuWA5SpDfelR',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/hr/timesheets/hr/timesheets' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/hr/timesheets/hr/timesheets/dashboard' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.dashboard',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/hr/timesheets/hr/timesheets/create' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.create',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/hr/timesheets/hr/timesheets/entries/create' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.entries.create',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/hr/timesheets/hr/timesheets/overtime/create' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.overtime.create',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/hr/timesheets/hr/timesheets/reports/generate' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.reports.generate',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/hr/timesheets/hr/timesheets/reports/export' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.reports.export',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/hr/timesheets/hr/timesheets/reports/monthly' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.reports.monthly',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/customers' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'customers.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'customers.store',
          ),
          1 => NULL,
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/customers/create' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'customers.create',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/customer-portal' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'customer-portal.index',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      '/customer-portal/dashboard' => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'customer-portal.dashboard',
          ),
          1 => NULL,
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
    ),
    2 => 
    array (
      0 => '{^(?|/re(?|set\\-password/([^/]++)(*:35)|ntals/(?|customers/([^/]++)(?|(*:72)|/edit(*:84)|(*:91))|rental(?|s/(?|([^/]++)(?|(*:124)|/(?|edit(*:140)|payments(?|(*:159)|/(?|create(*:177)|([^/]++)(?|(*:196)|/edit(*:209)|(*:217)))|(*:227))|items(?|(*:244)|/(?|create(*:262)|([^/]++)(?|(*:281)|/edit(*:294)|(*:302))|bulk(?|\\-create(*:326)|(*:334)))|(*:344)))|(*:354))|analytics(*:372)|([^/]++)(?|/(?|timesheets(*:405)|check\\-(?|missing\\-timesheets(*:442)|operator\\-availability(*:472))|print(*:486))|(*:495)))|\\-timesheets/([^/]++)(*:526))|extensions/([^/]++)(?|/(?|approve(*:568)|reject(*:582)|edit(*:594))|(*:603))|invoices/([^/]++)(?|(*:632)|/(?|edit(*:648)|documents/([^/]++)(*:674))|(*:683))|quotations/([^/]++)(?|(*:714)|/(?|edit(*:730)|approve(*:745)|reject(*:759))|(*:768))))|/verify\\-email/([^/]++)/([^/]++)(*:811)|/a(?|pi/(?|v1/(?|employee(?|s/(?|([^/]++)(?|(*:863))|last\\-file\\-number(*:890)|([^/]++)/(?|documents(*:919)|timesheets(*:937)|advances(*:953)))|\\-(?|documents/([^/]++)(?|(*:989)|/download(*:1006))|advances/([^/]++)(?|(*:1036))))|leaves/([^/]++)(?|(*:1066))|p(?|ositions/([^/]++)(?|(*:1100))|rojects/([^/]++)(?|(*:1129)))|timesheets/([^/]++)(?|(*:1162)|/(?|approve(*:1182)|reject(*:1197)))|departments/([^/]++)(*:1228)|resignations/([^/]++)(?|(*:1261)|/(?|approve(*:1281)|reject(*:1296))))|equipment/v1/(?|equipment/([^/]++)(?|(*:1345)|/(?|history(*:1365)|d(?|ocuments(?|(*:1389))|epreciation(*:1410))|status(*:1426)|costs(?|(*:1443))|utilization(*:1464)|tracking(?|(*:1484))|maintenance(?|(*:1508))))|maintenance(?|/([^/]++)(?|(*:1546)|/(?|complete(*:1567)|assign(*:1582)))|\\-(?|schedules/([^/]++)(?|(*:1619))|tasks/([^/]++)(?|(*:1646))|records/([^/]++)(?|(*:1675))))|technicians/([^/]++)(?|(*:1710)|/workload(*:1728)))|hr/(?|leaves/(?|requests/([^/]++)(?|(*:1775)|/(?|approve(*:1795)|reject(*:1810)))|balances/([^/]++)(*:1838)|calendar/([^/]++)/([^/]++)(*:1873))|timesheets/(?|weekly\\-timesheets/([^/]++)(?|(*:1927)|/submit(*:1943))|time\\-entries/(?|([^/]++)(?|(*:1981))|bulk(*:1995))|approvals/([^/]++)/(?|approve(*:2034)|reject(*:2049))|calendar/([^/]++)/([^/]++)(*:2085)|projects/([^/]++)/tasks(*:2117))))|udit/audit/logs/(?|([^/]++)(*:2156)|filter(*:2171)|user/([^/]++)(*:2193)|model/([^/]++)/([^/]++)(*:2225)))|/tokens/([^/]++)(?|(*:2255))|/users/(?|([^/]++)(*:2283)|create(*:2298)|([^/]++)(?|/edit(*:2323)|(*:2332))|bulk\\-destroy(*:2355)|([^/]++)(*:2372))|/s(?|ettings/(?|roles/(?|([^/]++)(*:2415)|create(*:2430)|([^/]++)(?|/edit(*:2455)|(*:2464)))|user\\-roles/([^/]++)(*:2495)|settings/(?|([^/]++)(?|(*:2527)|/edit(*:2541)|(*:2550))|bulk\\-update(*:2572)|company(?|(*:2591))|p(?|rofile(?|(*:2614))|assword(?|(*:2634)))|admin(*:2650)))|torage/(.*)(*:2672))|/e(?|mployee(?|managements/([^/]++)(?|(*:2720)|/edit(*:2734)|(*:2743))|s/([^/]++)(?|(*:2766)|/(?|edit(*:2783)|documents(*:2801)|timesheet\\-history(*:2828)|performance\\-(?|reviews(*:2860)|management(*:2879))|salary\\-history(*:2904)|leave\\-history(*:2927)|access\\-restrictions(*:2956))|(*:2966)))|quipment/equipment/(?|equipment/([^/]++)(?|/(?|edit(*:3028)|change\\-status(*:3051)|maintenance/create(*:3078))|(*:3088))|maintenance/([^/]++)(*:3118)))|/hr/(?|leaves/leaves/(?|requests/([^/]++)(?|(*:3173)|/edit(*:3187)|(*:3196))|approvals/([^/]++)/(?|approve(*:3235)|reject(*:3250))|balances/([^/]++)(*:3277)|types/([^/]++)(?|(*:3303)|/edit(*:3317)|(*:3326)))|payroll/(?|([^/]++)(?|(*:3359)|/(?|approve(*:3379)|process\\-payment(*:3404)|cancel(*:3419)))|generate\\-monthly(*:3447)|runs/([^/]++)(?|(*:3472)|/(?|approve(*:3492)|reject(*:3507)))|salary\\-advances(?|(*:3537)|/([^/]++)(?|(*:3558)|/(?|edit(*:3575)|approve(*:3591)|reject(*:3606))|(*:3616)))|final\\-settlements(?|(*:3648)|/([^/]++)(?|(*:3669)|/(?|approve(*:3689)|mark\\-as\\-paid(*:3712)|cancel(*:3727)|report(*:3742))))|employees/([^/]++)/advances(?|(*:3784)|/(?|create(*:3803)|history(?|(*:3822)|/(?|api(*:3838)|([^/]++)(*:3855)))|monthly\\-deduction(*:3884)|([^/]++)(?|(*:3904)|/(?|edit(*:3921)|re(?|payment(*:3942)|ject(*:3955))|approve(*:3972))|(*:3982))|payment/([^/]++)/receipt(*:4016)))|advance\\-payments(*:4044))|timesheets/hr/timesheets/(?|([^/]++)(?|(*:4093)|/(?|edit(*:4110)|submit(*:4125))|(*:4135))|check\\-duplicate(*:4161)|monthly(?|(*:4180)|\\-report(*:4197))|s(?|ummary(*:4217)|ettings(?|(*:4236)))|entries(?|(*:4257)|/([^/]++)(?|(*:4278)|/edit(*:4292)|(*:4301)))|overtime(?|(*:4323))|approvals(?|(*:4345)|/([^/]++)/(?|approve(*:4374)|reject(*:4389)))|reports(?|(*:4410)|/payslip/([^/]++)/([^/]++)(*:4445))|p(?|rojects(*:4466)|ay\\-slip(?|/([^/]++)/([^/]++)(*:4504)|\\-test(?:/([^/]++)(?:/([^/]++))?)?(*:4547)))|html\\-pay\\-slip/([^/]++)/([^/]++)(*:4591)|direct\\-pay\\-slip/([^/]++)/([^/]++)(*:4635)))|/projects/(?|([0-9]+)(*:4667)|([0-9]+)/edit(*:4689)|([0-9]+)(?|(*:4709))|([^/]++)/(?|resources(?|(*:4743)|/(?|([^/]++)(*:4764)|ma(?|npower(?|(*:4787)|/([^/]++)(?|(*:4808)))|terial(?|(*:4828)|/([^/]++)(?|(*:4849))))|e(?|quipment(?|(*:4876)|/([^/]++)(?|(*:4897)))|xpense(?|(*:4917)|/([^/]++)(?|(*:4938))))|fuel(?|(*:4957)|/([^/]++)(?|(*:4978)))|([^/]++)/([^/]++)(*:5006)))|tasks(?|(*:5025)|/(?|([0-9]+)(*:5046)|([0-9]+)/status(*:5070)|([0-9]+)(*:5087)))))|/customers/(?|([^/]++)(?|(*:5125)|/edit(*:5139)|(*:5148))|report(*:5164)|export(*:5179)|import(?|(*:5197))|([^/]++)/(?|invoices(*:5227)|rentals(*:5243)|quotations(*:5262)|payments(*:5279))))/?$}sDu',
    ),
    3 => 
    array (
      35 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'password.reset',
          ),
          1 => 
          array (
            0 => 'token',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      72 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.customers.show',
          ),
          1 => 
          array (
            0 => 'customer',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      84 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.customers.edit',
          ),
          1 => 
          array (
            0 => 'customer',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      91 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.customers.update',
          ),
          1 => 
          array (
            0 => 'customer',
          ),
          2 => 
          array (
            'PUT' => 0,
            'PATCH' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.customers.destroy',
          ),
          1 => 
          array (
            0 => 'customer',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      124 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.show',
          ),
          1 => 
          array (
            0 => 'rental',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      140 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.edit',
          ),
          1 => 
          array (
            0 => 'rental',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      159 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.rentals.payments.index',
          ),
          1 => 
          array (
            0 => 'rental',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      177 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.rentals.payments.create',
          ),
          1 => 
          array (
            0 => 'rental',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      196 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.rentals.payments.show',
          ),
          1 => 
          array (
            0 => 'rental',
            1 => 'payment',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      209 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.rentals.payments.edit',
          ),
          1 => 
          array (
            0 => 'rental',
            1 => 'payment',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      217 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.rentals.payments.update',
          ),
          1 => 
          array (
            0 => 'rental',
            1 => 'payment',
          ),
          2 => 
          array (
            'PUT' => 0,
            'PATCH' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.rentals.payments.destroy',
          ),
          1 => 
          array (
            0 => 'rental',
            1 => 'payment',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      227 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.rentals.payments.store',
          ),
          1 => 
          array (
            0 => 'rental',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      244 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.rentals.items.index',
          ),
          1 => 
          array (
            0 => 'rental',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      262 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.rentals.items.create',
          ),
          1 => 
          array (
            0 => 'rental',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      281 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.rentals.items.show',
          ),
          1 => 
          array (
            0 => 'rental',
            1 => 'item',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      294 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.rentals.items.edit',
          ),
          1 => 
          array (
            0 => 'rental',
            1 => 'item',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      302 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.rentals.items.update',
          ),
          1 => 
          array (
            0 => 'rental',
            1 => 'item',
          ),
          2 => 
          array (
            'PUT' => 0,
            'PATCH' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.rentals.items.destroy',
          ),
          1 => 
          array (
            0 => 'rental',
            1 => 'item',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      326 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.rentals.items.bulk-create',
          ),
          1 => 
          array (
            0 => 'rental',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      334 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.rentals.items.bulk-store',
          ),
          1 => 
          array (
            0 => 'rental',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      344 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.rentals.items.store',
          ),
          1 => 
          array (
            0 => 'rental',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      354 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.rentals.update',
          ),
          1 => 
          array (
            0 => 'rental',
          ),
          2 => 
          array (
            'PUT' => 0,
            'PATCH' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.destroy',
          ),
          1 => 
          array (
            0 => 'rental',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      372 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.analytics.index',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      405 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.timesheets',
          ),
          1 => 
          array (
            0 => 'rental',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      442 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.rental-timesheets.check-missing',
          ),
          1 => 
          array (
            0 => 'rental',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      472 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.rental-timesheets.check-operator-availability',
          ),
          1 => 
          array (
            0 => 'rental',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      486 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.print',
          ),
          1 => 
          array (
            0 => 'rental',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      495 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.update',
          ),
          1 => 
          array (
            0 => 'rental',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      526 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.rental-timesheets.show',
          ),
          1 => 
          array (
            0 => 'rentalTimesheet',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      568 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.extensions.approve',
          ),
          1 => 
          array (
            0 => 'extension',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      582 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.extensions.reject',
          ),
          1 => 
          array (
            0 => 'extension',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      594 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.extensions.edit',
          ),
          1 => 
          array (
            0 => 'extension',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      603 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.extensions.show',
          ),
          1 => 
          array (
            0 => 'extension',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.extensions.update',
          ),
          1 => 
          array (
            0 => 'extension',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        2 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.extensions.destroy',
          ),
          1 => 
          array (
            0 => 'extension',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      632 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.invoices.show',
          ),
          1 => 
          array (
            0 => 'invoice',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      648 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.invoices.edit',
          ),
          1 => 
          array (
            0 => 'invoice',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      674 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.invoices.documents.remove',
          ),
          1 => 
          array (
            0 => 'invoice',
            1 => 'documentId',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      683 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.invoices.update',
          ),
          1 => 
          array (
            0 => 'invoice',
          ),
          2 => 
          array (
            'PUT' => 0,
            'PATCH' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.invoices.destroy',
          ),
          1 => 
          array (
            0 => 'invoice',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      714 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.quotations.show',
          ),
          1 => 
          array (
            0 => 'quotation',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      730 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.quotations.edit',
          ),
          1 => 
          array (
            0 => 'quotation',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      745 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.quotations.approve',
          ),
          1 => 
          array (
            0 => 'quotation',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      759 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.quotations.reject',
          ),
          1 => 
          array (
            0 => 'quotation',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      768 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.quotations.update',
          ),
          1 => 
          array (
            0 => 'quotation',
          ),
          2 => 
          array (
            'PUT' => 0,
            'PATCH' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'rentals.quotations.destroy',
          ),
          1 => 
          array (
            0 => 'quotation',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      811 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'verification.verify',
          ),
          1 => 
          array (
            0 => 'id',
            1 => 'hash',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      863 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.employees.show',
          ),
          1 => 
          array (
            0 => 'employee',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'api.employees.update',
          ),
          1 => 
          array (
            0 => 'employee',
          ),
          2 => 
          array (
            'PUT' => 0,
            'PATCH' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        2 => 
        array (
          0 => 
          array (
            '_route' => 'api.employees.destroy',
          ),
          1 => 
          array (
            0 => 'employee',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      890 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      919 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.generated::cA2LOBYI5584BcdP',
          ),
          1 => 
          array (
            0 => 'employee',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      937 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.generated::SNFubV6etMnlZcZG',
          ),
          1 => 
          array (
            0 => 'employee',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      953 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.generated::iGdri9eOePzkHCg6',
          ),
          1 => 
          array (
            0 => 'employee',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      989 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.employee-documents.show',
          ),
          1 => 
          array (
            0 => 'employee_document',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'api.employee-documents.update',
          ),
          1 => 
          array (
            0 => 'employee_document',
          ),
          2 => 
          array (
            'PUT' => 0,
            'PATCH' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        2 => 
        array (
          0 => 
          array (
            '_route' => 'api.employee-documents.destroy',
          ),
          1 => 
          array (
            0 => 'employee_document',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      1006 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.generated::zBGuWQxWy7RncGAV',
          ),
          1 => 
          array (
            0 => 'document',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      1036 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.employee-advances.show',
          ),
          1 => 
          array (
            0 => 'employee_advance',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'api.employee-advances.update',
          ),
          1 => 
          array (
            0 => 'employee_advance',
          ),
          2 => 
          array (
            'PUT' => 0,
            'PATCH' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        2 => 
        array (
          0 => 
          array (
            '_route' => 'api.employee-advances.destroy',
          ),
          1 => 
          array (
            0 => 'employee_advance',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      1066 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.leaves.show',
          ),
          1 => 
          array (
            0 => 'leaf',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'api.leaves.update',
          ),
          1 => 
          array (
            0 => 'leaf',
          ),
          2 => 
          array (
            'PUT' => 0,
            'PATCH' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        2 => 
        array (
          0 => 
          array (
            '_route' => 'api.leaves.destroy',
          ),
          1 => 
          array (
            0 => 'leaf',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      1100 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.positions.show',
          ),
          1 => 
          array (
            0 => 'position',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'api.positions.update',
          ),
          1 => 
          array (
            0 => 'position',
          ),
          2 => 
          array (
            'PUT' => 0,
            'PATCH' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        2 => 
        array (
          0 => 
          array (
            '_route' => 'api.positions.destroy',
          ),
          1 => 
          array (
            0 => 'position',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      1129 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::gxAo2u6h7W6sSfC3',
          ),
          1 => 
          array (
            0 => 'project',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'generated::eox8hC0B4PJlyxAx',
          ),
          1 => 
          array (
            0 => 'project',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        2 => 
        array (
          0 => 
          array (
            '_route' => 'generated::lQRJe6J3Ti0Ey0RE',
          ),
          1 => 
          array (
            0 => 'project',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      1162 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.timesheets.show',
          ),
          1 => 
          array (
            0 => 'timesheet',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'api.timesheets.update',
          ),
          1 => 
          array (
            0 => 'timesheet',
          ),
          2 => 
          array (
            'PUT' => 0,
            'PATCH' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        2 => 
        array (
          0 => 
          array (
            '_route' => 'api.timesheets.destroy',
          ),
          1 => 
          array (
            0 => 'timesheet',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      1182 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.generated::weBtqCmJCXhTKgbw',
          ),
          1 => 
          array (
            0 => 'timesheet',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      1197 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.generated::CpOuepUUUrICOCsl',
          ),
          1 => 
          array (
            0 => 'timesheet',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      1228 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.departments.show',
          ),
          1 => 
          array (
            0 => 'department',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      1261 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.resignations.show',
          ),
          1 => 
          array (
            0 => 'resignation',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'api.resignations.update',
          ),
          1 => 
          array (
            0 => 'resignation',
          ),
          2 => 
          array (
            'PUT' => 0,
            'PATCH' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        2 => 
        array (
          0 => 
          array (
            '_route' => 'api.resignations.destroy',
          ),
          1 => 
          array (
            0 => 'resignation',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      1281 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.generated::iD7D90RuCAhlEpCA',
          ),
          1 => 
          array (
            0 => 'resignation',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      1296 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.generated::ihJmiapM6zOPYpZw',
          ),
          1 => 
          array (
            0 => 'resignation',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      1345 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.equipment.show',
          ),
          1 => 
          array (
            0 => 'equipment',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'api.equipment.update',
          ),
          1 => 
          array (
            0 => 'equipment',
          ),
          2 => 
          array (
            'PUT' => 0,
            'PATCH' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        2 => 
        array (
          0 => 
          array (
            '_route' => 'api.equipment.destroy',
          ),
          1 => 
          array (
            0 => 'equipment',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      1365 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::gyhUKjZs0oGGjk13',
          ),
          1 => 
          array (
            0 => 'equipment',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      1389 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::BVumSybLpQZV0gdb',
          ),
          1 => 
          array (
            0 => 'equipment',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'generated::RMVNDTc7VDvo42gF',
          ),
          1 => 
          array (
            0 => 'equipment',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      1410 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::6l0kmxhhgsisyfHl',
          ),
          1 => 
          array (
            0 => 'equipment',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      1426 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::ehczm1itOAFVazI6',
          ),
          1 => 
          array (
            0 => 'equipment',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      1443 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::R7K60A1EBuZjtIQh',
          ),
          1 => 
          array (
            0 => 'equipment',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'generated::YG3PrvuA9w3nYMM1',
          ),
          1 => 
          array (
            0 => 'equipment',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      1464 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::tRFZFe8h5qtoAE7c',
          ),
          1 => 
          array (
            0 => 'equipment',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      1484 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::f5NGhpvNvFrwmPKt',
          ),
          1 => 
          array (
            0 => 'equipment',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'generated::TiKF4lawzKHI275z',
          ),
          1 => 
          array (
            0 => 'equipment',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      1508 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::vhxTqJ9hKG14EKpk',
          ),
          1 => 
          array (
            0 => 'equipment',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'generated::vxofpXNSo5NVIuVF',
          ),
          1 => 
          array (
            0 => 'equipment',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      1546 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'maintenance.show',
          ),
          1 => 
          array (
            0 => 'maintenance',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'maintenance.update',
          ),
          1 => 
          array (
            0 => 'maintenance',
          ),
          2 => 
          array (
            'PUT' => 0,
            'PATCH' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        2 => 
        array (
          0 => 
          array (
            '_route' => 'maintenance.destroy',
          ),
          1 => 
          array (
            0 => 'maintenance',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      1567 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::4jStOFeOr7oFyNrS',
          ),
          1 => 
          array (
            0 => 'maintenance',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      1582 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::JPqqVnBQoHO80TzJ',
          ),
          1 => 
          array (
            0 => 'maintenance',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      1619 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'maintenance-schedules.show',
          ),
          1 => 
          array (
            0 => 'maintenance_schedule',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'maintenance-schedules.update',
          ),
          1 => 
          array (
            0 => 'maintenance_schedule',
          ),
          2 => 
          array (
            'PUT' => 0,
            'PATCH' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        2 => 
        array (
          0 => 
          array (
            '_route' => 'maintenance-schedules.destroy',
          ),
          1 => 
          array (
            0 => 'maintenance_schedule',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      1646 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'maintenance-tasks.show',
          ),
          1 => 
          array (
            0 => 'maintenance_task',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'maintenance-tasks.update',
          ),
          1 => 
          array (
            0 => 'maintenance_task',
          ),
          2 => 
          array (
            'PUT' => 0,
            'PATCH' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        2 => 
        array (
          0 => 
          array (
            '_route' => 'maintenance-tasks.destroy',
          ),
          1 => 
          array (
            0 => 'maintenance_task',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      1675 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'maintenance-records.show',
          ),
          1 => 
          array (
            0 => 'maintenance_record',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'maintenance-records.update',
          ),
          1 => 
          array (
            0 => 'maintenance_record',
          ),
          2 => 
          array (
            'PUT' => 0,
            'PATCH' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        2 => 
        array (
          0 => 
          array (
            '_route' => 'maintenance-records.destroy',
          ),
          1 => 
          array (
            0 => 'maintenance_record',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      1710 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'technicians.show',
          ),
          1 => 
          array (
            0 => 'technician',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'technicians.update',
          ),
          1 => 
          array (
            0 => 'technician',
          ),
          2 => 
          array (
            'PUT' => 0,
            'PATCH' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        2 => 
        array (
          0 => 
          array (
            '_route' => 'technicians.destroy',
          ),
          1 => 
          array (
            0 => 'technician',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      1728 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::0KRF1Tmc1QAifMke',
          ),
          1 => 
          array (
            0 => 'technician',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      1775 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::Mt5CCYVl2U2o6irV',
          ),
          1 => 
          array (
            0 => 'id',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'generated::V1HuaMUEiXZcHpsO',
          ),
          1 => 
          array (
            0 => 'id',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        2 => 
        array (
          0 => 
          array (
            '_route' => 'generated::vOgYNTtu7P3A9oGY',
          ),
          1 => 
          array (
            0 => 'id',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      1795 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::rNzLSJPqoqZDUbGt',
          ),
          1 => 
          array (
            0 => 'id',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      1810 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::Zma84uAyXSRuP2Hv',
          ),
          1 => 
          array (
            0 => 'id',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      1838 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::kAgL44hMdydBoK39',
          ),
          1 => 
          array (
            0 => 'employeeId',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      1873 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::axIW3lFkQsKKmqcN',
          ),
          1 => 
          array (
            0 => 'year',
            1 => 'month',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      1927 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::LVUXC2iUwbs3rItP',
          ),
          1 => 
          array (
            0 => 'id',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'generated::SvzUeYrQjUYbsB2Q',
          ),
          1 => 
          array (
            0 => 'id',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      1943 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::DHT7WT5iFuTb7ton',
          ),
          1 => 
          array (
            0 => 'id',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      1981 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::2yWYnM4C89l2dXWt',
          ),
          1 => 
          array (
            0 => 'id',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'generated::mvoKVwJmMdMuWlKE',
          ),
          1 => 
          array (
            0 => 'id',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        2 => 
        array (
          0 => 
          array (
            '_route' => 'generated::Z2Eu4BXWTgbstl0F',
          ),
          1 => 
          array (
            0 => 'id',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      1995 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::AXOvmoUMQmN64tVc',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      2034 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::l7c7NU14hrn2daVJ',
          ),
          1 => 
          array (
            0 => 'id',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      2049 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::E4Zocem0EiA62wO8',
          ),
          1 => 
          array (
            0 => 'id',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      2085 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::H9cakbEbEsh8xOQc',
          ),
          1 => 
          array (
            0 => 'year',
            1 => 'month',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      2117 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'generated::bfHEuwGGTCfLySP5',
          ),
          1 => 
          array (
            0 => 'projectId',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      2156 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'audit.logs.show',
          ),
          1 => 
          array (
            0 => 'auditLog',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      2171 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'audit.logs.filter',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      2193 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'audit.logs.user',
          ),
          1 => 
          array (
            0 => 'user',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      2225 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'audit.logs.model',
          ),
          1 => 
          array (
            0 => 'model',
            1 => 'id',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      2255 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'api.tokens.show',
          ),
          1 => 
          array (
            0 => 'token',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'api.tokens.update',
          ),
          1 => 
          array (
            0 => 'token',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        2 => 
        array (
          0 => 
          array (
            '_route' => 'api.tokens.destroy',
          ),
          1 => 
          array (
            0 => 'token',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      2283 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'users.show',
          ),
          1 => 
          array (
            0 => 'user',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      2298 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'users.create',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      2323 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'users.edit',
          ),
          1 => 
          array (
            0 => 'user',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      2332 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'users.update',
          ),
          1 => 
          array (
            0 => 'user',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      2355 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'users.bulk-destroy',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      2372 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'users.destroy',
          ),
          1 => 
          array (
            0 => 'user',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      2415 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'roles.show',
          ),
          1 => 
          array (
            0 => 'role',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      2430 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'roles.create',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      2455 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'roles.edit',
          ),
          1 => 
          array (
            0 => 'role',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      2464 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'roles.update',
          ),
          1 => 
          array (
            0 => 'role',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'roles.destroy',
          ),
          1 => 
          array (
            0 => 'role',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      2495 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'roles.update-user-roles',
          ),
          1 => 
          array (
            0 => 'user',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      2527 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'settings.show',
          ),
          1 => 
          array (
            0 => 'setting',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      2541 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'settings.edit',
          ),
          1 => 
          array (
            0 => 'setting',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      2550 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'settings.update',
          ),
          1 => 
          array (
            0 => 'setting',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'settings.destroy',
          ),
          1 => 
          array (
            0 => 'setting',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      2572 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'settings.bulk-update',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      2591 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'settings.company',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'settings.company.update',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      2614 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'settings.profile',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'settings.profile.update',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      2634 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'settings.password',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'settings.password.update',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      2650 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'settings.admin.dashboard',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      2672 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'storage.local',
          ),
          1 => 
          array (
            0 => 'path',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      2720 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'employeemanagement.show',
          ),
          1 => 
          array (
            0 => 'employeemanagement',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      2734 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'employeemanagement.edit',
          ),
          1 => 
          array (
            0 => 'employeemanagement',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      2743 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'employeemanagement.update',
          ),
          1 => 
          array (
            0 => 'employeemanagement',
          ),
          2 => 
          array (
            'PUT' => 0,
            'PATCH' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'employeemanagement.destroy',
          ),
          1 => 
          array (
            0 => 'employeemanagement',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      2766 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'employees.show',
          ),
          1 => 
          array (
            0 => 'employee',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      2783 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'employees.edit',
          ),
          1 => 
          array (
            0 => 'employee',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      2801 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'employees.documents',
          ),
          1 => 
          array (
            0 => 'employee',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      2828 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'employees.timesheet-history',
          ),
          1 => 
          array (
            0 => 'employee',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      2860 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'employees.performance-reviews',
          ),
          1 => 
          array (
            0 => 'employee',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      2879 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'employees.performance-management',
          ),
          1 => 
          array (
            0 => 'employee',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      2904 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'employees.salary-history',
          ),
          1 => 
          array (
            0 => 'employee',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      2927 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'employees.leave-history',
          ),
          1 => 
          array (
            0 => 'employee',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      2956 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'employees.update-access-restrictions',
          ),
          1 => 
          array (
            0 => 'employee',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      2966 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'employees.update',
          ),
          1 => 
          array (
            0 => 'employee',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'employees.destroy',
          ),
          1 => 
          array (
            0 => 'employee',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      3028 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'equipment.equipment.edit',
          ),
          1 => 
          array (
            0 => 'equipment',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3051 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'equipment.equipment.change-status',
          ),
          1 => 
          array (
            0 => 'equipment',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3078 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'equipment.equipment.maintenance.create',
          ),
          1 => 
          array (
            0 => 'equipment',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3088 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'equipment.equipment.update',
          ),
          1 => 
          array (
            0 => 'equipment',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'equipment.equipment.destroy',
          ),
          1 => 
          array (
            0 => 'equipment',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      3118 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'equipment.maintenance.show',
          ),
          1 => 
          array (
            0 => 'maintenance',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      3173 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'leaves.requests.show',
          ),
          1 => 
          array (
            0 => 'request',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      3187 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'leaves.requests.edit',
          ),
          1 => 
          array (
            0 => 'request',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3196 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'leaves.requests.update',
          ),
          1 => 
          array (
            0 => 'request',
          ),
          2 => 
          array (
            'PUT' => 0,
            'PATCH' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'leaves.requests.destroy',
          ),
          1 => 
          array (
            0 => 'request',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      3235 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'leaves.approvals.approve',
          ),
          1 => 
          array (
            0 => 'leaveRequest',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3250 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'leaves.approvals.reject',
          ),
          1 => 
          array (
            0 => 'leaveRequest',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3277 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'leaves.balances.show',
          ),
          1 => 
          array (
            0 => 'employee',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      3303 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'leaves.types.show',
          ),
          1 => 
          array (
            0 => 'type',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      3317 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'leaves.types.edit',
          ),
          1 => 
          array (
            0 => 'type',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3326 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'leaves.types.update',
          ),
          1 => 
          array (
            0 => 'type',
          ),
          2 => 
          array (
            'PUT' => 0,
            'PATCH' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'leaves.types.destroy',
          ),
          1 => 
          array (
            0 => 'type',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      3359 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.show',
          ),
          1 => 
          array (
            0 => 'payroll',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      3379 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.approve',
          ),
          1 => 
          array (
            0 => 'payroll',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3404 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.process-payment',
          ),
          1 => 
          array (
            0 => 'payroll',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3419 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.cancel',
          ),
          1 => 
          array (
            0 => 'payroll',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3447 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.generate-monthly',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3472 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.runs.show',
          ),
          1 => 
          array (
            0 => 'payrollRun',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      3492 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.runs.approve',
          ),
          1 => 
          array (
            0 => 'payrollRun',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3507 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.runs.reject',
          ),
          1 => 
          array (
            0 => 'payrollRun',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3537 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.salary-advances.index',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.salary-advances.store',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3558 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.salary-advances.show',
          ),
          1 => 
          array (
            0 => 'salary_advance',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      3575 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.salary-advances.edit',
          ),
          1 => 
          array (
            0 => 'salary_advance',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3591 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.salary-advances.approve',
          ),
          1 => 
          array (
            0 => 'salaryAdvance',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3606 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.salary-advances.reject',
          ),
          1 => 
          array (
            0 => 'salaryAdvance',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3616 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.salary-advances.update',
          ),
          1 => 
          array (
            0 => 'salary_advance',
          ),
          2 => 
          array (
            'PUT' => 0,
            'PATCH' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.salary-advances.destroy',
          ),
          1 => 
          array (
            0 => 'salary_advance',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      3648 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.final-settlements.index',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.final-settlements.store',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3669 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.final-settlements.show',
          ),
          1 => 
          array (
            0 => 'finalSettlement',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      3689 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.final-settlements.approve',
          ),
          1 => 
          array (
            0 => 'finalSettlement',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3712 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.final-settlements.mark-as-paid',
          ),
          1 => 
          array (
            0 => 'finalSettlement',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3727 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.final-settlements.cancel',
          ),
          1 => 
          array (
            0 => 'finalSettlement',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3742 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.final-settlements.report',
          ),
          1 => 
          array (
            0 => 'finalSettlement',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3784 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.employees.advances.index',
          ),
          1 => 
          array (
            0 => 'employee',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.employees.advances.store',
          ),
          1 => 
          array (
            0 => 'employee',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3803 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.employees.advances.create',
          ),
          1 => 
          array (
            0 => 'employee',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3822 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.employees.advances.payment-history',
          ),
          1 => 
          array (
            0 => 'employee',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3838 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.employees.advances.payment-history.api',
          ),
          1 => 
          array (
            0 => 'employee',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3855 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.employees.advances.payment-history.delete',
          ),
          1 => 
          array (
            0 => 'employee',
            1 => 'payment',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      3884 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.employees.advances.monthly-deduction',
          ),
          1 => 
          array (
            0 => 'employee',
          ),
          2 => 
          array (
            'PATCH' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3904 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.employees.advances.show',
          ),
          1 => 
          array (
            0 => 'employee',
            1 => 'advance',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      3921 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.employees.advances.edit',
          ),
          1 => 
          array (
            0 => 'employee',
            1 => 'advance',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3942 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.employees.advances.repayment',
          ),
          1 => 
          array (
            0 => 'employee',
            1 => 'advance',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3955 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.employees.advances.reject',
          ),
          1 => 
          array (
            0 => 'employee',
            1 => 'advance',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3972 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.employees.advances.approve',
          ),
          1 => 
          array (
            0 => 'employee',
            1 => 'advance',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      3982 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.employees.advances.update',
          ),
          1 => 
          array (
            0 => 'employee',
            1 => 'advance',
          ),
          2 => 
          array (
            'PATCH' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.employees.advances.destroy',
          ),
          1 => 
          array (
            0 => 'employee',
            1 => 'advance',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      4016 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.employees.advances.payment.receipt',
          ),
          1 => 
          array (
            0 => 'employee',
            1 => 'payment',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      4044 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'payroll.advance-payments.index',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      4093 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.show',
          ),
          1 => 
          array (
            0 => 'timesheet',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      4110 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.edit',
          ),
          1 => 
          array (
            0 => 'timesheet',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      4125 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.submit',
          ),
          1 => 
          array (
            0 => 'timesheet',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      4135 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.update',
          ),
          1 => 
          array (
            0 => 'timesheet',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.destroy',
          ),
          1 => 
          array (
            0 => 'timesheet',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      4161 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.check-duplicate',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      4180 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.monthly',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      4197 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.monthly-report',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      4217 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.summary',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      4236 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.settings.edit',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.settings.update',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      4257 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.entries.index',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.entries.store',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      4278 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.entries.show',
          ),
          1 => 
          array (
            0 => 'entryId',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      4292 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.entries.edit',
          ),
          1 => 
          array (
            0 => 'entryId',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      4301 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.entries.update',
          ),
          1 => 
          array (
            0 => 'entryId',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.entries.destroy',
          ),
          1 => 
          array (
            0 => 'entryId',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      4323 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.overtime.index',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.overtime.store',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      4345 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.approvals.index',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      4374 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.approvals.approve',
          ),
          1 => 
          array (
            0 => 'timesheetId',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      4389 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.approvals.reject',
          ),
          1 => 
          array (
            0 => 'timesheetId',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      4410 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.reports.index',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      4445 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.reports.payslip',
          ),
          1 => 
          array (
            0 => 'employeeId',
            1 => 'month',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      4466 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.projects.index',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      4504 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.pay-slip',
          ),
          1 => 
          array (
            0 => 'employee',
            1 => 'month',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      4547 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.pay-slip-test',
            'employee' => NULL,
            'month' => NULL,
          ),
          1 => 
          array (
            0 => 'employee',
            1 => 'month',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      4591 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.html-pay-slip',
          ),
          1 => 
          array (
            0 => 'employee',
            1 => 'month',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      4635 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'timesheets.direct-pay-slip',
          ),
          1 => 
          array (
            0 => 'employee',
            1 => 'month',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      4667 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'projects.show',
          ),
          1 => 
          array (
            0 => 'project',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      4689 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'projects.edit',
          ),
          1 => 
          array (
            0 => 'project',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      4709 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'projects.update',
          ),
          1 => 
          array (
            0 => 'project',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'projects.destroy',
          ),
          1 => 
          array (
            0 => 'project',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      4743 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'projects.resources',
          ),
          1 => 
          array (
            0 => 'project',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      4764 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'projects.resources.destroy',
          ),
          1 => 
          array (
            0 => 'project',
            1 => 'resource',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      4787 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'projects.resources.manpower.index',
          ),
          1 => 
          array (
            0 => 'project',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'projects.resources.manpower.store',
          ),
          1 => 
          array (
            0 => 'project',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      4808 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'projects.resources.manpower.update',
          ),
          1 => 
          array (
            0 => 'project',
            1 => 'manpower',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'projects.resources.manpower.destroy',
          ),
          1 => 
          array (
            0 => 'project',
            1 => 'manpower',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      4828 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'projects.resources.material.index',
          ),
          1 => 
          array (
            0 => 'project',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'projects.resources.material.store',
          ),
          1 => 
          array (
            0 => 'project',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      4849 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'projects.resources.material.update',
          ),
          1 => 
          array (
            0 => 'project',
            1 => 'material',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'projects.resources.material.destroy',
          ),
          1 => 
          array (
            0 => 'project',
            1 => 'material',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      4876 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'projects.resources.equipment.index',
          ),
          1 => 
          array (
            0 => 'project',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'projects.resources.equipment.store',
          ),
          1 => 
          array (
            0 => 'project',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      4897 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'projects.resources.equipment.update',
          ),
          1 => 
          array (
            0 => 'project',
            1 => 'equipment',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'projects.resources.equipment.destroy',
          ),
          1 => 
          array (
            0 => 'project',
            1 => 'equipment',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      4917 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'projects.resources.expense.index',
          ),
          1 => 
          array (
            0 => 'project',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'projects.resources.expense.store',
          ),
          1 => 
          array (
            0 => 'project',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      4938 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'projects.resources.expense.update',
          ),
          1 => 
          array (
            0 => 'project',
            1 => 'expense',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'projects.resources.expense.destroy',
          ),
          1 => 
          array (
            0 => 'project',
            1 => 'expense',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      4957 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'projects.resources.fuel.index',
          ),
          1 => 
          array (
            0 => 'project',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'projects.resources.fuel.store',
          ),
          1 => 
          array (
            0 => 'project',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      4978 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'projects.resources.fuel.update',
          ),
          1 => 
          array (
            0 => 'project',
            1 => 'fuel',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'projects.resources.fuel.destroy',
          ),
          1 => 
          array (
            0 => 'project',
            1 => 'fuel',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      5006 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'projects.resources.resource.destroy',
          ),
          1 => 
          array (
            0 => 'project',
            1 => 'type',
            2 => 'resource',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      5025 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'projects.tasks.index',
          ),
          1 => 
          array (
            0 => 'project',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'projects.tasks.store',
          ),
          1 => 
          array (
            0 => 'project',
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      5046 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'projects.tasks.update',
          ),
          1 => 
          array (
            0 => 'project',
            1 => 'task',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      5070 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'projects.tasks.status',
          ),
          1 => 
          array (
            0 => 'project',
            1 => 'task',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      5087 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'projects.tasks.destroy',
          ),
          1 => 
          array (
            0 => 'project',
            1 => 'task',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      5125 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'customers.show',
          ),
          1 => 
          array (
            0 => 'customer',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      5139 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'customers.edit',
          ),
          1 => 
          array (
            0 => 'customer',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      5148 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'customers.update',
          ),
          1 => 
          array (
            0 => 'customer',
          ),
          2 => 
          array (
            'PUT' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'customers.destroy',
          ),
          1 => 
          array (
            0 => 'customer',
          ),
          2 => 
          array (
            'DELETE' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => true,
          6 => NULL,
        ),
      ),
      5164 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'customers.report',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      5179 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'customers.export',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      5197 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'customers.import',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => 
          array (
            '_route' => 'customers.process-import',
          ),
          1 => 
          array (
          ),
          2 => 
          array (
            'POST' => 0,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      5227 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'customers.invoices',
          ),
          1 => 
          array (
            0 => 'customer',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      5243 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'customers.rentals',
          ),
          1 => 
          array (
            0 => 'customer',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      5262 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'customers.quotations',
          ),
          1 => 
          array (
            0 => 'customer',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
      ),
      5279 => 
      array (
        0 => 
        array (
          0 => 
          array (
            '_route' => 'customers.payments',
          ),
          1 => 
          array (
            0 => 'customer',
          ),
          2 => 
          array (
            'GET' => 0,
            'HEAD' => 1,
          ),
          3 => NULL,
          4 => false,
          5 => false,
          6 => NULL,
        ),
        1 => 
        array (
          0 => NULL,
          1 => NULL,
          2 => NULL,
          3 => NULL,
          4 => false,
          5 => false,
          6 => 0,
        ),
      ),
    ),
    4 => NULL,
  ),
  'attributes' => 
  array (
    'sanctum.csrf-cookie' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'sanctum/csrf-cookie',
      'action' => 
      array (
        'uses' => 'Laravel\\Sanctum\\Http\\Controllers\\CsrfCookieController@show',
        'controller' => 'Laravel\\Sanctum\\Http\\Controllers\\CsrfCookieController@show',
        'namespace' => NULL,
        'prefix' => 'sanctum',
        'where' => 
        array (
        ),
        'middleware' => 
        array (
          0 => 'web',
        ),
        'as' => 'sanctum.csrf-cookie',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::Vid6rWqBDByzZuxX' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'up',
      'action' => 
      array (
        'uses' => 'O:55:"Laravel\\SerializableClosure\\UnsignedSerializableClosure":1:{s:12:"serializable";O:46:"Laravel\\SerializableClosure\\Serializers\\Native":5:{s:3:"use";a:0:{}s:8:"function";s:843:"function () {
                    $exception = null;

                    try {
                        \\Illuminate\\Support\\Facades\\Event::dispatch(new \\Illuminate\\Foundation\\Events\\DiagnosingHealth);
                    } catch (\\Throwable $e) {
                        if (app()->hasDebugModeEnabled()) {
                            throw $e;
                        }

                        report($e);

                        $exception = $e->getMessage();
                    }

                    return response(\\Illuminate\\Support\\Facades\\View::file(\'D:\\\\Apps\\\\snd_rentalreact_app\\\\New_snd_app\\\\vendor\\\\laravel\\\\framework\\\\src\\\\Illuminate\\\\Foundation\\\\Configuration\'.\'/../resources/health-up.blade.php\', [
                        \'exception\' => $exception,
                    ]), status: $exception ? 500 : 200);
                }";s:5:"scope";s:54:"Illuminate\\Foundation\\Configuration\\ApplicationBuilder";s:4:"this";N;s:4:"self";s:32:"0000000000000ade0000000000000000";}}',
        'as' => 'generated::Vid6rWqBDByzZuxX',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'home' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => '/',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'O:55:"Laravel\\SerializableClosure\\UnsignedSerializableClosure":1:{s:12:"serializable";O:46:"Laravel\\SerializableClosure\\Serializers\\Native":5:{s:3:"use";a:0:{}s:8:"function";s:63:"function () {
    return \\Inertia\\Inertia::render(\'welcome\');
}";s:5:"scope";s:37:"Illuminate\\Routing\\RouteFileRegistrar";s:4:"this";N;s:4:"self";s:32:"0000000000000cd00000000000000000";}}',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'home',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'dashboard' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'dashboard',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'O:55:"Laravel\\SerializableClosure\\UnsignedSerializableClosure":1:{s:12:"serializable";O:46:"Laravel\\SerializableClosure\\Serializers\\Native":5:{s:3:"use";a:0:{}s:8:"function";s:73:"function () {
        return \\Inertia\\Inertia::render(\'dashboard\');
    }";s:5:"scope";s:37:"Illuminate\\Routing\\RouteFileRegistrar";s:4:"this";N;s:4:"self";s:32:"0000000000000cd80000000000000000";}}',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'dashboard',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::EsW180kFy5mblha2' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'modules_statuses.json',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'O:55:"Laravel\\SerializableClosure\\UnsignedSerializableClosure":1:{s:12:"serializable";O:46:"Laravel\\SerializableClosure\\Serializers\\Native":5:{s:3:"use";a:0:{}s:8:"function";s:249:"function () {
    $path = \\base_path(\'modules_statuses.json\');
    if (!\\file_exists($path)) {
        \\abort(404, \'modules_statuses.json not found\');
    }
    return \\response()->file($path, [
        \'Content-Type\' => \'application/json\'
    ]);
}";s:5:"scope";s:37:"Illuminate\\Routing\\RouteFileRegistrar";s:4:"this";N;s:4:"self";s:32:"0000000000000c890000000000000000";}}',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'generated::EsW180kFy5mblha2',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::pEvqs1TFog64HGAK' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
        2 => 'POST',
        3 => 'PUT',
        4 => 'PATCH',
        5 => 'DELETE',
        6 => 'OPTIONS',
      ),
      'uri' => 'settings',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => '\\Illuminate\\Routing\\RedirectController@__invoke',
        'controller' => '\\Illuminate\\Routing\\RedirectController',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'generated::pEvqs1TFog64HGAK',
      ),
      'fallback' => false,
      'defaults' => 
      array (
        'destination' => 'settings/profile',
        'status' => 302,
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'profile.edit' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'settings/profile',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'App\\Http\\Controllers\\Settings\\ProfileController@edit',
        'controller' => 'App\\Http\\Controllers\\Settings\\ProfileController@edit',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'profile.edit',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'profile.update' => 
    array (
      'methods' => 
      array (
        0 => 'PATCH',
      ),
      'uri' => 'settings/profile',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'App\\Http\\Controllers\\Settings\\ProfileController@update',
        'controller' => 'App\\Http\\Controllers\\Settings\\ProfileController@update',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'profile.update',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'profile.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'settings/profile',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'App\\Http\\Controllers\\Settings\\ProfileController@destroy',
        'controller' => 'App\\Http\\Controllers\\Settings\\ProfileController@destroy',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'profile.destroy',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'password.edit' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'settings/password',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'App\\Http\\Controllers\\Settings\\PasswordController@edit',
        'controller' => 'App\\Http\\Controllers\\Settings\\PasswordController@edit',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'password.edit',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'password.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'settings/password',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'App\\Http\\Controllers\\Settings\\PasswordController@update',
        'controller' => 'App\\Http\\Controllers\\Settings\\PasswordController@update',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'password.update',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'appearance' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'settings/appearance',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'O:55:"Laravel\\SerializableClosure\\UnsignedSerializableClosure":1:{s:12:"serializable";O:46:"Laravel\\SerializableClosure\\Serializers\\Native":5:{s:3:"use";a:0:{}s:8:"function";s:83:"function () {
        return \\Inertia\\Inertia::render(\'settings/appearance\');
    }";s:5:"scope";s:37:"Illuminate\\Routing\\RouteFileRegistrar";s:4:"this";N;s:4:"self";s:32:"0000000000000bab0000000000000000";}}',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'appearance',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'register' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'register',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'guest',
        ),
        'uses' => 'App\\Http\\Controllers\\Auth\\RegisteredUserController@create',
        'controller' => 'App\\Http\\Controllers\\Auth\\RegisteredUserController@create',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'register',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::BQC6Q3SipwEas8ha' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'register',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'guest',
        ),
        'uses' => 'App\\Http\\Controllers\\Auth\\RegisteredUserController@store',
        'controller' => 'App\\Http\\Controllers\\Auth\\RegisteredUserController@store',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'generated::BQC6Q3SipwEas8ha',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'login' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'login',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'guest',
        ),
        'uses' => 'App\\Http\\Controllers\\Auth\\AuthenticatedSessionController@create',
        'controller' => 'App\\Http\\Controllers\\Auth\\AuthenticatedSessionController@create',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'login',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::qcCWdCbYmcSTcPiU' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'login',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'guest',
        ),
        'uses' => 'App\\Http\\Controllers\\Auth\\AuthenticatedSessionController@store',
        'controller' => 'App\\Http\\Controllers\\Auth\\AuthenticatedSessionController@store',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'generated::qcCWdCbYmcSTcPiU',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'password.request' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'forgot-password',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'guest',
        ),
        'uses' => 'App\\Http\\Controllers\\Auth\\PasswordResetLinkController@create',
        'controller' => 'App\\Http\\Controllers\\Auth\\PasswordResetLinkController@create',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'password.request',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'password.email' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'forgot-password',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'guest',
        ),
        'uses' => 'App\\Http\\Controllers\\Auth\\PasswordResetLinkController@store',
        'controller' => 'App\\Http\\Controllers\\Auth\\PasswordResetLinkController@store',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'password.email',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'password.reset' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'reset-password/{token}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'guest',
        ),
        'uses' => 'App\\Http\\Controllers\\Auth\\NewPasswordController@create',
        'controller' => 'App\\Http\\Controllers\\Auth\\NewPasswordController@create',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'password.reset',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'password.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'reset-password',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'guest',
        ),
        'uses' => 'App\\Http\\Controllers\\Auth\\NewPasswordController@store',
        'controller' => 'App\\Http\\Controllers\\Auth\\NewPasswordController@store',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'password.store',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'verification.notice' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'verify-email',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'App\\Http\\Controllers\\Auth\\EmailVerificationPromptController@__invoke',
        'controller' => 'App\\Http\\Controllers\\Auth\\EmailVerificationPromptController',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'verification.notice',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'verification.verify' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'verify-email/{id}/{hash}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'signed',
          3 => 'throttle:6,1',
        ),
        'uses' => 'App\\Http\\Controllers\\Auth\\VerifyEmailController@__invoke',
        'controller' => 'App\\Http\\Controllers\\Auth\\VerifyEmailController',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'verification.verify',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'verification.send' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'email/verification-notification',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'throttle:6,1',
        ),
        'uses' => 'App\\Http\\Controllers\\Auth\\EmailVerificationNotificationController@store',
        'controller' => 'App\\Http\\Controllers\\Auth\\EmailVerificationNotificationController@store',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'verification.send',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'password.confirm' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'confirm-password',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'App\\Http\\Controllers\\Auth\\ConfirmablePasswordController@show',
        'controller' => 'App\\Http\\Controllers\\Auth\\ConfirmablePasswordController@show',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'password.confirm',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::oAMGJCg4wjezSvob' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'confirm-password',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'App\\Http\\Controllers\\Auth\\ConfirmablePasswordController@store',
        'controller' => 'App\\Http\\Controllers\\Auth\\ConfirmablePasswordController@store',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'generated::oAMGJCg4wjezSvob',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'logout' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'logout',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'App\\Http\\Controllers\\Auth\\AuthenticatedSessionController@destroy',
        'controller' => 'App\\Http\\Controllers\\Auth\\AuthenticatedSessionController@destroy',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'logout',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::2drJlNfAQ1YW20o6' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'leave-requests',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'O:55:"Laravel\\SerializableClosure\\UnsignedSerializableClosure":1:{s:12:"serializable";O:46:"Laravel\\SerializableClosure\\Serializers\\Native":5:{s:3:"use";a:0:{}s:8:"function";s:70:"function () {
        return \\redirect()->route(\'leaves.index\');
    }";s:5:"scope";s:37:"Illuminate\\Routing\\RouteFileRegistrar";s:4:"this";N;s:4:"self";s:32:"00000000000006b10000000000000000";}}',
        'namespace' => NULL,
        'prefix' => '/leave-requests',
        'where' => 
        array (
        ),
        'as' => 'generated::2drJlNfAQ1YW20o6',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::E2piQSzSIAiheUEI' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'timesheets',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'O:55:"Laravel\\SerializableClosure\\UnsignedSerializableClosure":1:{s:12:"serializable";O:46:"Laravel\\SerializableClosure\\Serializers\\Native":5:{s:3:"use";a:0:{}s:8:"function";s:74:"function () {
        return \\redirect()->route(\'timesheets.index\');
    }";s:5:"scope";s:37:"Illuminate\\Routing\\RouteFileRegistrar";s:4:"this";N;s:4:"self";s:32:"0000000000000b2c0000000000000000";}}',
        'namespace' => NULL,
        'prefix' => '/timesheets',
        'where' => 
        array (
        ),
        'as' => 'generated::E2piQSzSIAiheUEI',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::q85XyCvWpWKnvcXS' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'projects',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'O:55:"Laravel\\SerializableClosure\\UnsignedSerializableClosure":1:{s:12:"serializable";O:46:"Laravel\\SerializableClosure\\Serializers\\Native":5:{s:3:"use";a:0:{}s:8:"function";s:72:"function () {
        return \\redirect()->route(\'projects.index\');
    }";s:5:"scope";s:37:"Illuminate\\Routing\\RouteFileRegistrar";s:4:"this";N;s:4:"self";s:32:"00000000000006b30000000000000000";}}',
        'namespace' => NULL,
        'prefix' => '/projects',
        'where' => 
        array (
        ),
        'as' => 'generated::q85XyCvWpWKnvcXS',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::MUN7kAYhUKbbRtDU' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'O:55:"Laravel\\SerializableClosure\\UnsignedSerializableClosure":1:{s:12:"serializable";O:46:"Laravel\\SerializableClosure\\Serializers\\Native":5:{s:3:"use";a:0:{}s:8:"function";s:71:"function () {
        return \\redirect()->route(\'rentals.index\');
    }";s:5:"scope";s:37:"Illuminate\\Routing\\RouteFileRegistrar";s:4:"this";N;s:4:"self";s:32:"0000000000000ac70000000000000000";}}',
        'namespace' => NULL,
        'prefix' => '/rentals',
        'where' => 
        array (
        ),
        'as' => 'generated::MUN7kAYhUKbbRtDU',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::ODS63HExyrBw37Fq' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'equipment',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'O:55:"Laravel\\SerializableClosure\\UnsignedSerializableClosure":1:{s:12:"serializable";O:46:"Laravel\\SerializableClosure\\Serializers\\Native":5:{s:3:"use";a:0:{}s:8:"function";s:83:"function () {
        return \\redirect()->route(\'equipment.equipment.index\');
    }";s:5:"scope";s:37:"Illuminate\\Routing\\RouteFileRegistrar";s:4:"this";N;s:4:"self";s:32:"00000000000006b50000000000000000";}}',
        'namespace' => NULL,
        'prefix' => '/equipment',
        'where' => 
        array (
        ),
        'as' => 'generated::ODS63HExyrBw37Fq',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::CikPFgExi2VvwzTs' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'payrolls',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'O:55:"Laravel\\SerializableClosure\\UnsignedSerializableClosure":1:{s:12:"serializable";O:46:"Laravel\\SerializableClosure\\Serializers\\Native":5:{s:3:"use";a:0:{}s:8:"function";s:71:"function () {
        return \\redirect()->route(\'payroll.index\');
    }";s:5:"scope";s:37:"Illuminate\\Routing\\RouteFileRegistrar";s:4:"this";N;s:4:"self";s:32:"00000000000006d60000000000000000";}}',
        'namespace' => NULL,
        'prefix' => '/payrolls',
        'where' => 
        array (
        ),
        'as' => 'generated::CikPFgExi2VvwzTs',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::YfFbqoFNvZral77O' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'localization',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'O:55:"Laravel\\SerializableClosure\\UnsignedSerializableClosure":1:{s:12:"serializable";O:46:"Laravel\\SerializableClosure\\Serializers\\Native":5:{s:3:"use";a:0:{}s:8:"function";s:82:"function () {
        return \\Inertia\\Inertia::render(\'Localization/Index\');
    }";s:5:"scope";s:37:"Illuminate\\Routing\\RouteFileRegistrar";s:4:"this";N;s:4:"self";s:32:"0000000000000c650000000000000000";}}',
        'namespace' => NULL,
        'prefix' => '/localization',
        'where' => 
        array (
        ),
        'as' => 'generated::YfFbqoFNvZral77O',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::unA71fKsGmqfxD2D' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'audit',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'O:55:"Laravel\\SerializableClosure\\UnsignedSerializableClosure":1:{s:12:"serializable";O:46:"Laravel\\SerializableClosure\\Serializers\\Native":5:{s:3:"use";a:0:{}s:8:"function";s:69:"function () {
        return \\redirect()->route(\'audit.index\');
    }";s:5:"scope";s:37:"Illuminate\\Routing\\RouteFileRegistrar";s:4:"this";N;s:4:"self";s:32:"00000000000006aa0000000000000000";}}',
        'namespace' => NULL,
        'prefix' => '/audit',
        'where' => 
        array (
        ),
        'as' => 'generated::unA71fKsGmqfxD2D',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::JgoRdrWuXktkFYUP' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'leaves',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'O:55:"Laravel\\SerializableClosure\\UnsignedSerializableClosure":1:{s:12:"serializable";O:46:"Laravel\\SerializableClosure\\Serializers\\Native":5:{s:3:"use";a:0:{}s:8:"function";s:70:"function () {
        return \\redirect()->route(\'leaves.index\');
    }";s:5:"scope";s:37:"Illuminate\\Routing\\RouteFileRegistrar";s:4:"this";N;s:4:"self";s:32:"00000000000006b90000000000000000";}}',
        'namespace' => NULL,
        'prefix' => '/leaves',
        'where' => 
        array (
        ),
        'as' => 'generated::JgoRdrWuXktkFYUP',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::JPyvMLFCRsa9crmm' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'leave',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'O:55:"Laravel\\SerializableClosure\\UnsignedSerializableClosure":1:{s:12:"serializable";O:46:"Laravel\\SerializableClosure\\Serializers\\Native":5:{s:3:"use";a:0:{}s:8:"function";s:62:"function () {
    return \\redirect()->route(\'leaves.index\');
}";s:5:"scope";s:37:"Illuminate\\Routing\\RouteFileRegistrar";s:4:"this";N;s:4:"self";s:32:"0000000000000c6e0000000000000000";}}',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'generated::JPyvMLFCRsa9crmm',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.employees.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/v1/employees',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.employees.index',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\EmployeeController@index',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\EmployeeController@index',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.employees.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/v1/employees',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.employees.store',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\EmployeeController@store',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\EmployeeController@store',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.employees.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/v1/employees/{employee}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.employees.show',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\EmployeeController@show',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\EmployeeController@show',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.employees.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
        1 => 'PATCH',
      ),
      'uri' => 'api/v1/employees/{employee}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.employees.update',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\EmployeeController@update',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\EmployeeController@update',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.employees.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'api/v1/employees/{employee}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.employees.destroy',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\EmployeeController@destroy',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\EmployeeController@destroy',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.leaves.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/v1/leaves',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
        ),
        'as' => 'api.leaves.index',
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveController@index',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveController@index',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.leaves.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/v1/leaves',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
        ),
        'as' => 'api.leaves.store',
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveController@store',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveController@store',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.leaves.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/v1/leaves/{leaf}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
        ),
        'as' => 'api.leaves.show',
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveController@show',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveController@show',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.leaves.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
        1 => 'PATCH',
      ),
      'uri' => 'api/v1/leaves/{leaf}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
        ),
        'as' => 'api.leaves.update',
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveController@update',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveController@update',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.leaves.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'api/v1/leaves/{leaf}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
        ),
        'as' => 'api.leaves.destroy',
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveController@destroy',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveController@destroy',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.tokens.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'tokens',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'Modules\\API\\Http\\Controllers\\ApiTokenController@index',
        'controller' => 'Modules\\API\\Http\\Controllers\\ApiTokenController@index',
        'namespace' => 'Modules\\API\\Http\\Controllers',
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'api.tokens.index',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.tokens.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'tokens/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'Modules\\API\\Http\\Controllers\\ApiTokenController@create',
        'controller' => 'Modules\\API\\Http\\Controllers\\ApiTokenController@create',
        'namespace' => 'Modules\\API\\Http\\Controllers',
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'api.tokens.create',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.tokens.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'tokens',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'Modules\\API\\Http\\Controllers\\ApiTokenController@store',
        'controller' => 'Modules\\API\\Http\\Controllers\\ApiTokenController@store',
        'namespace' => 'Modules\\API\\Http\\Controllers',
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'api.tokens.store',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.tokens.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'tokens/{token}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'Modules\\API\\Http\\Controllers\\ApiTokenController@show',
        'controller' => 'Modules\\API\\Http\\Controllers\\ApiTokenController@show',
        'namespace' => 'Modules\\API\\Http\\Controllers',
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'api.tokens.show',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.tokens.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'tokens/{token}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'Modules\\API\\Http\\Controllers\\ApiTokenController@update',
        'controller' => 'Modules\\API\\Http\\Controllers\\ApiTokenController@update',
        'namespace' => 'Modules\\API\\Http\\Controllers',
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'api.tokens.update',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.tokens.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'tokens/{token}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'Modules\\API\\Http\\Controllers\\ApiTokenController@destroy',
        'controller' => 'Modules\\API\\Http\\Controllers\\ApiTokenController@destroy',
        'namespace' => 'Modules\\API\\Http\\Controllers',
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'api.tokens.destroy',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.stats' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'stats',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'Modules\\API\\Http\\Controllers\\APIController@stats',
        'controller' => 'Modules\\API\\Http\\Controllers\\APIController@stats',
        'namespace' => 'Modules\\API\\Http\\Controllers',
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'api.stats',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.stats.usage' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'stats/usage',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'Modules\\API\\Http\\Controllers\\APIController@usageStats',
        'controller' => 'Modules\\API\\Http\\Controllers\\APIController@usageStats',
        'namespace' => 'Modules\\API\\Http\\Controllers',
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'api.stats.usage',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.stats.endpoints' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'stats/endpoints',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'Modules\\API\\Http\\Controllers\\APIController@endpointStats',
        'controller' => 'Modules\\API\\Http\\Controllers\\APIController@endpointStats',
        'namespace' => 'Modules\\API\\Http\\Controllers',
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'api.stats.endpoints',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.stats.export' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'stats/export',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
        ),
        'uses' => 'Modules\\API\\Http\\Controllers\\APIController@exportStats',
        'controller' => 'Modules\\API\\Http\\Controllers\\APIController@exportStats',
        'namespace' => 'Modules\\API\\Http\\Controllers',
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'api.stats.export',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.settings' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'settings',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'can:manage api settings',
        ),
        'uses' => 'Modules\\API\\Http\\Controllers\\APIController@settings',
        'controller' => 'Modules\\API\\Http\\Controllers\\APIController@settings',
        'namespace' => 'Modules\\API\\Http\\Controllers',
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'api.settings',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.settings.update' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'settings',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'can:manage api settings',
        ),
        'uses' => 'Modules\\API\\Http\\Controllers\\APIController@updateSettings',
        'controller' => 'Modules\\API\\Http\\Controllers\\APIController@updateSettings',
        'namespace' => 'Modules\\API\\Http\\Controllers',
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'api.settings.update',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.rate-limits' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rate-limits',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'can:manage api settings',
        ),
        'uses' => 'Modules\\API\\Http\\Controllers\\APIController@rateLimits',
        'controller' => 'Modules\\API\\Http\\Controllers\\APIController@rateLimits',
        'namespace' => 'Modules\\API\\Http\\Controllers',
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'api.rate-limits',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.rate-limits.update' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'rate-limits',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'can:manage api settings',
        ),
        'uses' => 'Modules\\API\\Http\\Controllers\\APIController@updateRateLimits',
        'controller' => 'Modules\\API\\Http\\Controllers\\APIController@updateRateLimits',
        'namespace' => 'Modules\\API\\Http\\Controllers',
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'api.rate-limits.update',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'audit.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'audit/audit',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@index',
        'controller' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@index',
        'as' => 'audit.index',
        'namespace' => 'Modules\\AuditCompliance\\Http\\Controllers',
        'prefix' => 'audit/audit',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'audit.dashboard' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'audit/audit/dashboard',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@dashboard',
        'controller' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@dashboard',
        'as' => 'audit.dashboard',
        'namespace' => 'Modules\\AuditCompliance\\Http\\Controllers',
        'prefix' => 'audit/audit',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'audit.logs' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'audit/audit/logs',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@index',
        'controller' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@index',
        'as' => 'audit.logs',
        'namespace' => 'Modules\\AuditCompliance\\Http\\Controllers',
        'prefix' => 'audit/audit',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'audit.logs.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'audit/audit/logs/{auditLog}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@show',
        'controller' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@show',
        'as' => 'audit.logs.show',
        'namespace' => 'Modules\\AuditCompliance\\Http\\Controllers',
        'prefix' => 'audit/audit',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'audit.logs.filter' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'audit/audit/logs/filter',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@filter',
        'controller' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@filter',
        'as' => 'audit.logs.filter',
        'namespace' => 'Modules\\AuditCompliance\\Http\\Controllers',
        'prefix' => 'audit/audit',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'audit.logs.user' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'audit/audit/logs/user/{user}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@userActivity',
        'controller' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@userActivity',
        'as' => 'audit.logs.user',
        'namespace' => 'Modules\\AuditCompliance\\Http\\Controllers',
        'prefix' => 'audit/audit',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'audit.logs.model' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'audit/audit/logs/model/{model}/{id}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@modelChanges',
        'controller' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@modelChanges',
        'as' => 'audit.logs.model',
        'namespace' => 'Modules\\AuditCompliance\\Http\\Controllers',
        'prefix' => 'audit/audit',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'audit.reports' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'audit/audit/reports',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@reports',
        'controller' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@reports',
        'as' => 'audit.reports',
        'namespace' => 'Modules\\AuditCompliance\\Http\\Controllers',
        'prefix' => 'audit/audit',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'audit.reports.activity' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'audit/audit/reports/activity',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@activityReport',
        'controller' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@activityReport',
        'as' => 'audit.reports.activity',
        'namespace' => 'Modules\\AuditCompliance\\Http\\Controllers',
        'prefix' => 'audit/audit',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'audit.reports.changes' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'audit/audit/reports/changes',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@changesReport',
        'controller' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@changesReport',
        'as' => 'audit.reports.changes',
        'namespace' => 'Modules\\AuditCompliance\\Http\\Controllers',
        'prefix' => 'audit/audit',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'audit.reports.user-activity' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'audit/audit/reports/user-activity',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@userActivityReport',
        'controller' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@userActivityReport',
        'as' => 'audit.reports.user-activity',
        'namespace' => 'Modules\\AuditCompliance\\Http\\Controllers',
        'prefix' => 'audit/audit',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'audit.reports.export' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'audit/audit/reports/export',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@export',
        'controller' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@export',
        'as' => 'audit.reports.export',
        'namespace' => 'Modules\\AuditCompliance\\Http\\Controllers',
        'prefix' => 'audit/audit',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'audit.reports.generate' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'audit/audit/reports/generate',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@generateReport',
        'controller' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@generateReport',
        'as' => 'audit.reports.generate',
        'namespace' => 'Modules\\AuditCompliance\\Http\\Controllers',
        'prefix' => 'audit/audit',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'audit.compliance' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'audit/audit/compliance',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'can:manage compliance',
        ),
        'uses' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@compliance',
        'controller' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@compliance',
        'as' => 'audit.compliance',
        'namespace' => 'Modules\\AuditCompliance\\Http\\Controllers',
        'prefix' => 'audit/audit',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'audit.compliance.settings' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'audit/audit/compliance/settings',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'can:manage compliance',
        ),
        'uses' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@complianceSettings',
        'controller' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@complianceSettings',
        'as' => 'audit.compliance.settings',
        'namespace' => 'Modules\\AuditCompliance\\Http\\Controllers',
        'prefix' => 'audit/audit',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'audit.compliance.settings.update' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'audit/audit/compliance/settings',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'can:manage compliance',
        ),
        'uses' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@updateComplianceSettings',
        'controller' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@updateComplianceSettings',
        'as' => 'audit.compliance.settings.update',
        'namespace' => 'Modules\\AuditCompliance\\Http\\Controllers',
        'prefix' => 'audit/audit',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'audit.compliance.alerts' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'audit/audit/compliance/alerts',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'can:manage compliance',
        ),
        'uses' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@complianceAlerts',
        'controller' => 'Modules\\AuditCompliance\\Http\\Controllers\\AuditLogController@complianceAlerts',
        'as' => 'audit.compliance.alerts',
        'namespace' => 'Modules\\AuditCompliance\\Http\\Controllers',
        'prefix' => 'audit/audit',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::uXkkrt7KpPVRVLQn' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/core',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'O:55:"Laravel\\SerializableClosure\\UnsignedSerializableClosure":1:{s:12:"serializable";O:46:"Laravel\\SerializableClosure\\Serializers\\Native":5:{s:3:"use";a:0:{}s:8:"function";s:77:"function (\\Illuminate\\Http\\Request $request) {
    return $request->user();
}";s:5:"scope";s:37:"Illuminate\\Routing\\RouteFileRegistrar";s:4:"this";N;s:4:"self";s:32:"00000000000006910000000000000000";}}',
        'namespace' => 'Modules\\Core\\Http\\Controllers',
        'prefix' => 'api',
        'where' => 
        array (
        ),
        'as' => 'generated::uXkkrt7KpPVRVLQn',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'users.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'users',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'permission:users.view',
        ),
        'uses' => 'Modules\\Core\\Http\\Controllers\\UserController@index',
        'controller' => 'Modules\\Core\\Http\\Controllers\\UserController@index',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'users.index',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'users.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'users/{user}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'permission:users.view',
        ),
        'uses' => 'Modules\\Core\\Http\\Controllers\\UserController@show',
        'controller' => 'Modules\\Core\\Http\\Controllers\\UserController@show',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'users.show',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'users.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'users/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'permission:users.create',
        ),
        'uses' => 'Modules\\Core\\Http\\Controllers\\UserController@create',
        'controller' => 'Modules\\Core\\Http\\Controllers\\UserController@create',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'users.create',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'users.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'users',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'permission:users.create',
        ),
        'uses' => 'Modules\\Core\\Http\\Controllers\\UserController@store',
        'controller' => 'Modules\\Core\\Http\\Controllers\\UserController@store',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'users.store',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'users.edit' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'users/{user}/edit',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'permission:users.edit',
        ),
        'uses' => 'Modules\\Core\\Http\\Controllers\\UserController@edit',
        'controller' => 'Modules\\Core\\Http\\Controllers\\UserController@edit',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'users.edit',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'users.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'users/{user}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'permission:users.edit',
        ),
        'uses' => 'Modules\\Core\\Http\\Controllers\\UserController@update',
        'controller' => 'Modules\\Core\\Http\\Controllers\\UserController@update',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'users.update',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'users.bulk-destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'users/bulk-destroy',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'permission:users.delete',
        ),
        'uses' => 'Modules\\Core\\Http\\Controllers\\UserController@bulkDestroy',
        'controller' => 'Modules\\Core\\Http\\Controllers\\UserController@bulkDestroy',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'users.bulk-destroy',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'users.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'users/{user}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'permission:users.delete',
        ),
        'uses' => 'Modules\\Core\\Http\\Controllers\\UserController@destroy',
        'controller' => 'Modules\\Core\\Http\\Controllers\\UserController@destroy',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'users.destroy',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'roles.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'settings/roles',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'permission:roles.view',
        ),
        'uses' => 'Modules\\Core\\Http\\Controllers\\RoleController@index',
        'controller' => 'Modules\\Core\\Http\\Controllers\\RoleController@index',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'roles.index',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'roles.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'settings/roles/{role}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'permission:roles.view',
        ),
        'uses' => 'Modules\\Core\\Http\\Controllers\\RoleController@show',
        'controller' => 'Modules\\Core\\Http\\Controllers\\RoleController@show',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'roles.show',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'roles.user-roles' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'settings/user-roles',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'permission:roles.view',
        ),
        'uses' => 'Modules\\Core\\Http\\Controllers\\RoleController@userRoles',
        'controller' => 'Modules\\Core\\Http\\Controllers\\RoleController@userRoles',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'roles.user-roles',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'roles.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'settings/roles/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'permission:roles.create',
        ),
        'uses' => 'Modules\\Core\\Http\\Controllers\\RoleController@create',
        'controller' => 'Modules\\Core\\Http\\Controllers\\RoleController@create',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'roles.create',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'roles.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'settings/roles',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'permission:roles.create',
        ),
        'uses' => 'Modules\\Core\\Http\\Controllers\\RoleController@store',
        'controller' => 'Modules\\Core\\Http\\Controllers\\RoleController@store',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'roles.store',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'roles.edit' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'settings/roles/{role}/edit',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'permission:roles.edit',
        ),
        'uses' => 'Modules\\Core\\Http\\Controllers\\RoleController@edit',
        'controller' => 'Modules\\Core\\Http\\Controllers\\RoleController@edit',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'roles.edit',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'roles.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'settings/roles/{role}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'permission:roles.edit',
        ),
        'uses' => 'Modules\\Core\\Http\\Controllers\\RoleController@update',
        'controller' => 'Modules\\Core\\Http\\Controllers\\RoleController@update',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'roles.update',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'roles.update-user-roles' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'settings/user-roles/{user}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'permission:roles.edit',
        ),
        'uses' => 'Modules\\Core\\Http\\Controllers\\RoleController@updateUserRoles',
        'controller' => 'Modules\\Core\\Http\\Controllers\\RoleController@updateUserRoles',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'roles.update-user-roles',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'roles.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'settings/roles/{role}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'permission:roles.delete',
        ),
        'uses' => 'Modules\\Core\\Http\\Controllers\\RoleController@destroy',
        'controller' => 'Modules\\Core\\Http\\Controllers\\RoleController@destroy',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'roles.destroy',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::42STzMHD0PvMwAxB' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'core',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'O:55:"Laravel\\SerializableClosure\\UnsignedSerializableClosure":1:{s:12:"serializable";O:46:"Laravel\\SerializableClosure\\Serializers\\Native":5:{s:3:"use";a:0:{}s:8:"function";s:77:"function (\\Illuminate\\Http\\Request $request) {
    return $request->user();
}";s:5:"scope";s:37:"Illuminate\\Routing\\RouteFileRegistrar";s:4:"this";N;s:4:"self";s:32:"0000000000000adc0000000000000000";}}',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'generated::42STzMHD0PvMwAxB',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/v1/employees/last-file-number',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
        ),
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\EmployeeController@getNextFileNumber',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\EmployeeController@getNextFileNumber',
        'as' => 'api.',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.positions.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/v1/positions',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.positions.index',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\PositionController@index',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\PositionController@index',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.positions.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/v1/positions',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
        ),
        'as' => 'api.positions.store',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\PositionController@store',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\PositionController@store',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.positions.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/v1/positions/{position}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.positions.show',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\PositionController@show',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\PositionController@show',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.positions.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
        1 => 'PATCH',
      ),
      'uri' => 'api/v1/positions/{position}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
        ),
        'as' => 'api.positions.update',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\PositionController@update',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\PositionController@update',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.positions.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'api/v1/positions/{position}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
        ),
        'as' => 'api.positions.destroy',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\PositionController@destroy',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\PositionController@destroy',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.generated::cA2LOBYI5584BcdP' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/v1/employees/{employee}/documents',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\EmployeeController@documents',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\EmployeeController@documents',
        'as' => 'api.generated::cA2LOBYI5584BcdP',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.generated::SNFubV6etMnlZcZG' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/v1/employees/{employee}/timesheets',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\EmployeeController@timesheets',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\EmployeeController@timesheets',
        'as' => 'api.generated::SNFubV6etMnlZcZG',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.generated::iGdri9eOePzkHCg6' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/v1/employees/{employee}/advances',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\EmployeeController@advances',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\EmployeeController@advances',
        'as' => 'api.generated::iGdri9eOePzkHCg6',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.timesheets.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/v1/timesheets',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.timesheets.index',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\TimesheetController@index',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\TimesheetController@index',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.timesheets.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/v1/timesheets',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.timesheets.store',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\TimesheetController@store',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\TimesheetController@store',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.timesheets.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/v1/timesheets/{timesheet}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.timesheets.show',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\TimesheetController@show',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\TimesheetController@show',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.timesheets.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
        1 => 'PATCH',
      ),
      'uri' => 'api/v1/timesheets/{timesheet}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.timesheets.update',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\TimesheetController@update',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\TimesheetController@update',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.timesheets.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'api/v1/timesheets/{timesheet}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.timesheets.destroy',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\TimesheetController@destroy',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\TimesheetController@destroy',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.generated::weBtqCmJCXhTKgbw' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/v1/timesheets/{timesheet}/approve',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\TimesheetController@approve',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\TimesheetController@approve',
        'as' => 'api.generated::weBtqCmJCXhTKgbw',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.generated::CpOuepUUUrICOCsl' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/v1/timesheets/{timesheet}/reject',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\TimesheetController@reject',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\Api\\TimesheetController@reject',
        'as' => 'api.generated::CpOuepUUUrICOCsl',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.departments.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/v1/departments',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.departments.index',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\DepartmentController@index',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\DepartmentController@index',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.departments.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/v1/departments/{department}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.departments.show',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\DepartmentController@show',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\DepartmentController@show',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.employee-documents.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/v1/employee-documents',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.employee-documents.index',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeDocumentController@index',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeDocumentController@index',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.employee-documents.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/v1/employee-documents',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.employee-documents.store',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeDocumentController@store',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeDocumentController@store',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.employee-documents.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/v1/employee-documents/{employee_document}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.employee-documents.show',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeDocumentController@show',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeDocumentController@show',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.employee-documents.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
        1 => 'PATCH',
      ),
      'uri' => 'api/v1/employee-documents/{employee_document}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.employee-documents.update',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeDocumentController@update',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeDocumentController@update',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.employee-documents.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'api/v1/employee-documents/{employee_document}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.employee-documents.destroy',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeDocumentController@destroy',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeDocumentController@destroy',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.generated::zBGuWQxWy7RncGAV' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/v1/employee-documents/{document}/download',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeDocumentController@download',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeDocumentController@download',
        'as' => 'api.generated::zBGuWQxWy7RncGAV',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.employee-advances.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/v1/employee-advances',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.employee-advances.index',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeAdvanceController@index',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeAdvanceController@index',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.employee-advances.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/v1/employee-advances',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.employee-advances.store',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeAdvanceController@store',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeAdvanceController@store',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.employee-advances.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/v1/employee-advances/{employee_advance}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.employee-advances.show',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeAdvanceController@show',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeAdvanceController@show',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.employee-advances.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
        1 => 'PATCH',
      ),
      'uri' => 'api/v1/employee-advances/{employee_advance}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.employee-advances.update',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeAdvanceController@update',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeAdvanceController@update',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.employee-advances.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'api/v1/employee-advances/{employee_advance}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.employee-advances.destroy',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeAdvanceController@destroy',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeAdvanceController@destroy',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.resignations.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/v1/resignations',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.resignations.index',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\ResignationController@index',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\ResignationController@index',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.resignations.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/v1/resignations',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.resignations.store',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\ResignationController@store',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\ResignationController@store',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.resignations.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/v1/resignations/{resignation}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.resignations.show',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\ResignationController@show',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\ResignationController@show',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.resignations.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
        1 => 'PATCH',
      ),
      'uri' => 'api/v1/resignations/{resignation}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.resignations.update',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\ResignationController@update',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\ResignationController@update',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.resignations.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'api/v1/resignations/{resignation}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.resignations.destroy',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\ResignationController@destroy',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\ResignationController@destroy',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.generated::iD7D90RuCAhlEpCA' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/v1/resignations/{resignation}/approve',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\ResignationController@approve',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\ResignationController@approve',
        'as' => 'api.generated::iD7D90RuCAhlEpCA',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.generated::ihJmiapM6zOPYpZw' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/v1/resignations/{resignation}/reject',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\ResignationController@reject',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\ResignationController@reject',
        'as' => 'api.generated::ihJmiapM6zOPYpZw',
        'namespace' => NULL,
        'prefix' => 'api/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'employeemanagement.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'employeemanagements',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'as' => 'employeemanagement.index',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeManagementController@index',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeManagementController@index',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'employeemanagement.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'employeemanagements/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'as' => 'employeemanagement.create',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeManagementController@create',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeManagementController@create',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'employeemanagement.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'employeemanagements',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'as' => 'employeemanagement.store',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeManagementController@store',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeManagementController@store',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'employeemanagement.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'employeemanagements/{employeemanagement}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'as' => 'employeemanagement.show',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeManagementController@show',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeManagementController@show',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'employeemanagement.edit' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'employeemanagements/{employeemanagement}/edit',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'as' => 'employeemanagement.edit',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeManagementController@edit',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeManagementController@edit',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'employeemanagement.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
        1 => 'PATCH',
      ),
      'uri' => 'employeemanagements/{employeemanagement}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'as' => 'employeemanagement.update',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeManagementController@update',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeManagementController@update',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'employeemanagement.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'employeemanagements/{employeemanagement}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'as' => 'employeemanagement.destroy',
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeManagementController@destroy',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeManagementController@destroy',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'employees.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'employees',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeController@index',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeController@index',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'employees.index',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'employees.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'employees/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeController@create',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeController@create',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'employees.create',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'employees.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'employees',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeController@store',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeController@store',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'employees.store',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'employees.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'employees/{employee}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeController@show',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeController@show',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'employees.show',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'employees.edit' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'employees/{employee}/edit',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeController@edit',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeController@edit',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'employees.edit',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'employees.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'employees/{employee}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeController@update',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeController@update',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'employees.update',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'employees.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'employees/{employee}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeController@destroy',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeController@destroy',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'employees.destroy',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'employees.documents' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'employees/{employee}/documents',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'O:55:"Laravel\\SerializableClosure\\UnsignedSerializableClosure":1:{s:12:"serializable";O:46:"Laravel\\SerializableClosure\\Serializers\\Native":5:{s:3:"use";a:0:{}s:8:"function";s:121:"function ($employee) {
        return \\Inertia\\Inertia::render(\'Employees/Documents\', [\'employeeId\' => $employee]);
    }";s:5:"scope";s:37:"Illuminate\\Routing\\RouteFileRegistrar";s:4:"this";N;s:4:"self";s:32:"0000000000000b180000000000000000";}}',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'employees.documents',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'employees.timesheet-history' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'employees/{employee}/timesheet-history',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'O:55:"Laravel\\SerializableClosure\\UnsignedSerializableClosure":1:{s:12:"serializable";O:46:"Laravel\\SerializableClosure\\Serializers\\Native":5:{s:3:"use";a:0:{}s:8:"function";s:128:"function ($employee) {
        return \\Inertia\\Inertia::render(\'Employees/TimesheetHistory\', [\'employeeId\' => $employee]);
    }";s:5:"scope";s:37:"Illuminate\\Routing\\RouteFileRegistrar";s:4:"this";N;s:4:"self";s:32:"0000000000000b1a0000000000000000";}}',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'employees.timesheet-history',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'employees.performance-reviews' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'employees/{employee}/performance-reviews',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'O:55:"Laravel\\SerializableClosure\\UnsignedSerializableClosure":1:{s:12:"serializable";O:46:"Laravel\\SerializableClosure\\Serializers\\Native":5:{s:3:"use";a:0:{}s:8:"function";s:130:"function ($employee) {
        return \\Inertia\\Inertia::render(\'Employees/PerformanceReviews\', [\'employeeId\' => $employee]);
    }";s:5:"scope";s:37:"Illuminate\\Routing\\RouteFileRegistrar";s:4:"this";N;s:4:"self";s:32:"0000000000000b1c0000000000000000";}}',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'employees.performance-reviews',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'employees.performance-management' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'employees/{employee}/performance-management',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'O:55:"Laravel\\SerializableClosure\\UnsignedSerializableClosure":1:{s:12:"serializable";O:46:"Laravel\\SerializableClosure\\Serializers\\Native":5:{s:3:"use";a:0:{}s:8:"function";s:133:"function ($employee) {
        return \\Inertia\\Inertia::render(\'Employees/PerformanceManagement\', [\'employeeId\' => $employee]);
    }";s:5:"scope";s:37:"Illuminate\\Routing\\RouteFileRegistrar";s:4:"this";N;s:4:"self";s:32:"0000000000000b1e0000000000000000";}}',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'employees.performance-management',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'employees.salary-history' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'employees/{employee}/salary-history',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'O:55:"Laravel\\SerializableClosure\\UnsignedSerializableClosure":1:{s:12:"serializable";O:46:"Laravel\\SerializableClosure\\Serializers\\Native":5:{s:3:"use";a:0:{}s:8:"function";s:125:"function ($employee) {
        return \\Inertia\\Inertia::render(\'Employees/SalaryHistory\', [\'employeeId\' => $employee]);
    }";s:5:"scope";s:37:"Illuminate\\Routing\\RouteFileRegistrar";s:4:"this";N;s:4:"self";s:32:"0000000000000b200000000000000000";}}',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'employees.salary-history',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'employees.leave-history' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'employees/{employee}/leave-history',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'O:55:"Laravel\\SerializableClosure\\UnsignedSerializableClosure":1:{s:12:"serializable";O:46:"Laravel\\SerializableClosure\\Serializers\\Native":5:{s:3:"use";a:0:{}s:8:"function";s:124:"function ($employee) {
        return \\Inertia\\Inertia::render(\'Employees/LeaveHistory\', [\'employeeId\' => $employee]);
    }";s:5:"scope";s:37:"Illuminate\\Routing\\RouteFileRegistrar";s:4:"this";N;s:4:"self";s:32:"0000000000000b220000000000000000";}}',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'employees.leave-history',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'employees.update-access-restrictions' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'employees/{employee}/access-restrictions',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'permission:employees.edit',
        ),
        'uses' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeController@updateAccessRestrictions',
        'controller' => 'Modules\\EmployeeManagement\\Http\\Controllers\\EmployeeController@updateAccessRestrictions',
        'namespace' => NULL,
        'prefix' => '',
        'where' => 
        array (
        ),
        'as' => 'employees.update-access-restrictions',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.equipment.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/equipment/v1/equipment',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.equipment.index',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentApiController@index',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentApiController@index',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.equipment.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/equipment/v1/equipment',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.equipment.store',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentApiController@store',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentApiController@store',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.equipment.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/equipment/v1/equipment/{equipment}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.equipment.show',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentApiController@show',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentApiController@show',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.equipment.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
        1 => 'PATCH',
      ),
      'uri' => 'api/equipment/v1/equipment/{equipment}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.equipment.update',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentApiController@update',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentApiController@update',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'api.equipment.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'api/equipment/v1/equipment/{equipment}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'api.equipment.destroy',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentApiController@destroy',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentApiController@destroy',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::gyhUKjZs0oGGjk13' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/equipment/v1/equipment/{equipment}/history',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentApiController@history',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentApiController@history',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
        'as' => 'generated::gyhUKjZs0oGGjk13',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::BVumSybLpQZV0gdb' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/equipment/v1/equipment/{equipment}/documents',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentApiController@documents',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentApiController@documents',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
        'as' => 'generated::BVumSybLpQZV0gdb',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::RMVNDTc7VDvo42gF' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/equipment/v1/equipment/{equipment}/documents',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentApiController@storeDocument',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentApiController@storeDocument',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
        'as' => 'generated::RMVNDTc7VDvo42gF',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::ehczm1itOAFVazI6' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'api/equipment/v1/equipment/{equipment}/status',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentApiController@updateStatus',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentApiController@updateStatus',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
        'as' => 'generated::ehczm1itOAFVazI6',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::R7K60A1EBuZjtIQh' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/equipment/v1/equipment/{equipment}/costs',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentCostController@index',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentCostController@index',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
        'as' => 'generated::R7K60A1EBuZjtIQh',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::YG3PrvuA9w3nYMM1' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/equipment/v1/equipment/{equipment}/costs',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentCostController@store',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentCostController@store',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
        'as' => 'generated::YG3PrvuA9w3nYMM1',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::6l0kmxhhgsisyfHl' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/equipment/v1/equipment/{equipment}/depreciation',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\DepreciationController@show',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\DepreciationController@show',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
        'as' => 'generated::6l0kmxhhgsisyfHl',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::5g2K8KJjWCkFJY0y' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/equipment/v1/depreciation/dashboard',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\DepreciationController@dashboard',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\DepreciationController@dashboard',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
        'as' => 'generated::5g2K8KJjWCkFJY0y',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::tRFZFe8h5qtoAE7c' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/equipment/v1/equipment/{equipment}/utilization',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentUtilizationController@show',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentUtilizationController@show',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
        'as' => 'generated::tRFZFe8h5qtoAE7c',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::tTh4U7VduLeeyY9m' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/equipment/v1/equipment/utilization/report',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentUtilizationController@report',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentUtilizationController@report',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
        'as' => 'generated::tTh4U7VduLeeyY9m',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::f5NGhpvNvFrwmPKt' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/equipment/v1/equipment/{equipment}/tracking',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentTrackingController@show',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentTrackingController@show',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
        'as' => 'generated::f5NGhpvNvFrwmPKt',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::TiKF4lawzKHI275z' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/equipment/v1/equipment/{equipment}/tracking',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentTrackingController@update',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentTrackingController@update',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
        'as' => 'generated::TiKF4lawzKHI275z',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'maintenance.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/equipment/v1/maintenance',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'maintenance.index',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceController@index',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceController@index',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'maintenance.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/equipment/v1/maintenance',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'maintenance.store',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceController@store',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceController@store',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'maintenance.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/equipment/v1/maintenance/{maintenance}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'maintenance.show',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceController@show',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceController@show',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'maintenance.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
        1 => 'PATCH',
      ),
      'uri' => 'api/equipment/v1/maintenance/{maintenance}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'maintenance.update',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceController@update',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceController@update',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'maintenance.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'api/equipment/v1/maintenance/{maintenance}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'maintenance.destroy',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceController@destroy',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceController@destroy',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'maintenance-schedules.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/equipment/v1/maintenance-schedules',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'maintenance-schedules.index',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceScheduleController@index',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceScheduleController@index',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'maintenance-schedules.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/equipment/v1/maintenance-schedules',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'maintenance-schedules.store',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceScheduleController@store',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceScheduleController@store',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'maintenance-schedules.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/equipment/v1/maintenance-schedules/{maintenance_schedule}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'maintenance-schedules.show',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceScheduleController@show',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceScheduleController@show',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'maintenance-schedules.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
        1 => 'PATCH',
      ),
      'uri' => 'api/equipment/v1/maintenance-schedules/{maintenance_schedule}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'maintenance-schedules.update',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceScheduleController@update',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceScheduleController@update',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'maintenance-schedules.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'api/equipment/v1/maintenance-schedules/{maintenance_schedule}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'maintenance-schedules.destroy',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceScheduleController@destroy',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceScheduleController@destroy',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'maintenance-tasks.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/equipment/v1/maintenance-tasks',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'maintenance-tasks.index',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceTaskController@index',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceTaskController@index',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'maintenance-tasks.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/equipment/v1/maintenance-tasks',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'maintenance-tasks.store',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceTaskController@store',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceTaskController@store',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'maintenance-tasks.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/equipment/v1/maintenance-tasks/{maintenance_task}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'maintenance-tasks.show',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceTaskController@show',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceTaskController@show',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'maintenance-tasks.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
        1 => 'PATCH',
      ),
      'uri' => 'api/equipment/v1/maintenance-tasks/{maintenance_task}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'maintenance-tasks.update',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceTaskController@update',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceTaskController@update',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'maintenance-tasks.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'api/equipment/v1/maintenance-tasks/{maintenance_task}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'maintenance-tasks.destroy',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceTaskController@destroy',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceTaskController@destroy',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'maintenance-records.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/equipment/v1/maintenance-records',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'maintenance-records.index',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceRecordController@index',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceRecordController@index',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'maintenance-records.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/equipment/v1/maintenance-records',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'maintenance-records.store',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceRecordController@store',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceRecordController@store',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'maintenance-records.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/equipment/v1/maintenance-records/{maintenance_record}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'maintenance-records.show',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceRecordController@show',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceRecordController@show',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'maintenance-records.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
        1 => 'PATCH',
      ),
      'uri' => 'api/equipment/v1/maintenance-records/{maintenance_record}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'maintenance-records.update',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceRecordController@update',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceRecordController@update',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'maintenance-records.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'api/equipment/v1/maintenance-records/{maintenance_record}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'maintenance-records.destroy',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceRecordController@destroy',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceRecordController@destroy',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::vhxTqJ9hKG14EKpk' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/equipment/v1/equipment/{equipment}/maintenance',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentMaintenanceController@schedule',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentMaintenanceController@schedule',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
        'as' => 'generated::vhxTqJ9hKG14EKpk',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::vxofpXNSo5NVIuVF' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/equipment/v1/equipment/{equipment}/maintenance',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentMaintenanceController@history',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentMaintenanceController@history',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
        'as' => 'generated::vxofpXNSo5NVIuVF',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::4jStOFeOr7oFyNrS' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'api/equipment/v1/maintenance/{maintenance}/complete',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceController@markComplete',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceController@markComplete',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
        'as' => 'generated::4jStOFeOr7oFyNrS',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'technicians.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/equipment/v1/technicians',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'technicians.index',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\TechnicianController@index',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\TechnicianController@index',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'technicians.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/equipment/v1/technicians',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'technicians.store',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\TechnicianController@store',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\TechnicianController@store',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'technicians.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/equipment/v1/technicians/{technician}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'technicians.show',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\TechnicianController@show',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\TechnicianController@show',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'technicians.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
        1 => 'PATCH',
      ),
      'uri' => 'api/equipment/v1/technicians/{technician}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'technicians.update',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\TechnicianController@update',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\TechnicianController@update',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'technicians.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'api/equipment/v1/technicians/{technician}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'as' => 'technicians.destroy',
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\TechnicianController@destroy',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\TechnicianController@destroy',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::0KRF1Tmc1QAifMke' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/equipment/v1/technicians/{technician}/workload',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\TechnicianController@workload',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\TechnicianController@workload',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
        'as' => 'generated::0KRF1Tmc1QAifMke',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::JPqqVnBQoHO80TzJ' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/equipment/v1/maintenance/{maintenance}/assign',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceController@assignTechnician',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceController@assignTechnician',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'api/equipment/v1',
        'where' => 
        array (
        ),
        'as' => 'generated::JPqqVnBQoHO80TzJ',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'equipment.equipment.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'equipment/equipment/equipment',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'permission:equipment.view',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentController@index',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentController@index',
        'as' => 'equipment.equipment.index',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'equipment/equipment',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'equipment.equipment.availability' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'equipment/equipment/equipment-availability',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'permission:equipment.view',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentController@availability',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentController@availability',
        'as' => 'equipment.equipment.availability',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'equipment/equipment',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'equipment.equipment.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'equipment/equipment/equipment/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'permission:equipment.create',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentController@create',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentController@create',
        'as' => 'equipment.equipment.create',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'equipment/equipment',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'equipment.equipment.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'equipment/equipment/equipment',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'permission:equipment.create',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentController@store',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentController@store',
        'as' => 'equipment.equipment.store',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'equipment/equipment',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'equipment.equipment.edit' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'equipment/equipment/equipment/{equipment}/edit',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'permission:equipment.edit',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentController@edit',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentController@edit',
        'as' => 'equipment.equipment.edit',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'equipment/equipment',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'equipment.equipment.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'equipment/equipment/equipment/{equipment}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'permission:equipment.edit',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentController@update',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentController@update',
        'as' => 'equipment.equipment.update',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'equipment/equipment',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'equipment.equipment.change-status' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'equipment/equipment/equipment/{equipment}/change-status',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'permission:equipment.edit',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentController@changeStatus',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentController@changeStatus',
        'as' => 'equipment.equipment.change-status',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'equipment/equipment',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'equipment.equipment.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'equipment/equipment/equipment/{equipment}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'permission:equipment.delete',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentController@destroy',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\EquipmentController@destroy',
        'as' => 'equipment.equipment.destroy',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'equipment/equipment',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'equipment.maintenance.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'equipment/equipment/maintenance/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'permission:maintenance.create',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceRecordController@create',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceRecordController@create',
        'as' => 'equipment.maintenance.create',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'equipment/equipment',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'equipment.maintenance.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'equipment/equipment/maintenance',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'permission:maintenance.create',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceRecordController@store',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceRecordController@store',
        'as' => 'equipment.maintenance.store',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'equipment/equipment',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'equipment.equipment.maintenance.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'equipment/equipment/equipment/{equipment}/maintenance/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'permission:maintenance.create',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceRecordController@createForEquipment',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceRecordController@createForEquipment',
        'as' => 'equipment.equipment.maintenance.create',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'equipment/equipment',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'equipment.maintenance.inventory-items' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'equipment/equipment/maintenance/inventory-items',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenancePartController@inventoryItems',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenancePartController@inventoryItems',
        'as' => 'equipment.maintenance.inventory-items',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'equipment/equipment',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'equipment.maintenance.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'equipment/equipment/maintenance',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'permission:maintenance.view',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceRecordController@index',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceRecordController@index',
        'as' => 'equipment.maintenance.index',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'equipment/equipment',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'equipment.maintenance.schedule' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'equipment/equipment/maintenance-schedule',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'permission:maintenance.view',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceRecordController@schedule',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceRecordController@schedule',
        'as' => 'equipment.maintenance.schedule',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'equipment/equipment',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'equipment.maintenance.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'equipment/equipment/maintenance/{maintenance}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'permission:maintenance.view',
        ),
        'uses' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceRecordController@show',
        'controller' => 'Modules\\EquipmentManagement\\Http\\Controllers\\MaintenanceRecordController@show',
        'as' => 'equipment.maintenance.show',
        'namespace' => 'Modules\\EquipmentManagement\\Http\\Controllers',
        'prefix' => 'equipment/equipment',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::3WajEaUKFn2cM0xb' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/hr/leaves/requests',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@apiIndex',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@apiIndex',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'api/hr/leaves',
        'where' => 
        array (
        ),
        'as' => 'generated::3WajEaUKFn2cM0xb',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::VRk9BgvqXfmJRZBB' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/hr/leaves/requests',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@apiStore',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@apiStore',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'api/hr/leaves',
        'where' => 
        array (
        ),
        'as' => 'generated::VRk9BgvqXfmJRZBB',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::Mt5CCYVl2U2o6irV' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/hr/leaves/requests/{id}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@apiShow',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@apiShow',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'api/hr/leaves',
        'where' => 
        array (
        ),
        'as' => 'generated::Mt5CCYVl2U2o6irV',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::V1HuaMUEiXZcHpsO' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'api/hr/leaves/requests/{id}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@apiUpdate',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@apiUpdate',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'api/hr/leaves',
        'where' => 
        array (
        ),
        'as' => 'generated::V1HuaMUEiXZcHpsO',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::vOgYNTtu7P3A9oGY' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'api/hr/leaves/requests/{id}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@apiDestroy',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@apiDestroy',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'api/hr/leaves',
        'where' => 
        array (
        ),
        'as' => 'generated::vOgYNTtu7P3A9oGY',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::rNzLSJPqoqZDUbGt' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'api/hr/leaves/requests/{id}/approve',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveApprovalController@apiApprove',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveApprovalController@apiApprove',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'api/hr/leaves',
        'where' => 
        array (
        ),
        'as' => 'generated::rNzLSJPqoqZDUbGt',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::Zma84uAyXSRuP2Hv' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'api/hr/leaves/requests/{id}/reject',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveApprovalController@apiReject',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveApprovalController@apiReject',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'api/hr/leaves',
        'where' => 
        array (
        ),
        'as' => 'generated::Zma84uAyXSRuP2Hv',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::wNT1LbJcKqtl3NUE' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/hr/leaves/balances',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveBalanceController@apiIndex',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveBalanceController@apiIndex',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'api/hr/leaves',
        'where' => 
        array (
        ),
        'as' => 'generated::wNT1LbJcKqtl3NUE',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::kAgL44hMdydBoK39' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/hr/leaves/balances/{employeeId}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveBalanceController@apiShow',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveBalanceController@apiShow',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'api/hr/leaves',
        'where' => 
        array (
        ),
        'as' => 'generated::kAgL44hMdydBoK39',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::x4TSfjmJbONPjpyF' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/hr/leaves/types',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveTypeController@apiIndex',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveTypeController@apiIndex',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'api/hr/leaves',
        'where' => 
        array (
        ),
        'as' => 'generated::x4TSfjmJbONPjpyF',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::ubVkTU68JQ08Yois' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/hr/leaves/calendar',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveController@apiCalendar',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveController@apiCalendar',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'api/hr/leaves',
        'where' => 
        array (
        ),
        'as' => 'generated::ubVkTU68JQ08Yois',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::axIW3lFkQsKKmqcN' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/hr/leaves/calendar/{year}/{month}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveController@apiCalendarMonth',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveController@apiCalendarMonth',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'api/hr/leaves',
        'where' => 
        array (
        ),
        'as' => 'generated::axIW3lFkQsKKmqcN',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'leaves.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/leaves/leaves',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveController@index',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveController@index',
        'as' => 'leaves.index',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'hr/leaves/leaves',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'leaves.requests.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/leaves/leaves/requests',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'as' => 'leaves.requests.index',
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@index',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@index',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'hr/leaves/leaves',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'leaves.requests.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/leaves/leaves/requests/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'as' => 'leaves.requests.create',
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@create',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@create',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'hr/leaves/leaves',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'leaves.requests.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'hr/leaves/leaves/requests',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'as' => 'leaves.requests.store',
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@store',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@store',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'hr/leaves/leaves',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'leaves.requests.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/leaves/leaves/requests/{request}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'as' => 'leaves.requests.show',
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@show',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@show',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'hr/leaves/leaves',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'leaves.requests.edit' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/leaves/leaves/requests/{request}/edit',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'as' => 'leaves.requests.edit',
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@edit',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@edit',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'hr/leaves/leaves',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'leaves.requests.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
        1 => 'PATCH',
      ),
      'uri' => 'hr/leaves/leaves/requests/{request}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'as' => 'leaves.requests.update',
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@update',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@update',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'hr/leaves/leaves',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'leaves.requests.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'hr/leaves/leaves/requests/{request}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'as' => 'leaves.requests.destroy',
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@destroy',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@destroy',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'hr/leaves/leaves',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'leaves.approvals.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/leaves/leaves/approvals',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveApprovalController@index',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveApprovalController@index',
        'as' => 'leaves.approvals.index',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'hr/leaves/leaves',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'leaves.approvals.approve' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'hr/leaves/leaves/approvals/{leaveRequest}/approve',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveApprovalController@approve',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveApprovalController@approve',
        'as' => 'leaves.approvals.approve',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'hr/leaves/leaves',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'leaves.approvals.reject' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'hr/leaves/leaves/approvals/{leaveRequest}/reject',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveApprovalController@reject',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveApprovalController@reject',
        'as' => 'leaves.approvals.reject',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'hr/leaves/leaves',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'leaves.balances.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/leaves/leaves/balances',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveBalanceController@index',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveBalanceController@index',
        'as' => 'leaves.balances.index',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'hr/leaves/leaves',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'leaves.balances.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/leaves/leaves/balances/{employee}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveBalanceController@show',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveBalanceController@show',
        'as' => 'leaves.balances.show',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'hr/leaves/leaves',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'leaves.types.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/leaves/leaves/types',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'can:manage-leave-types',
        ),
        'as' => 'leaves.types.index',
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveTypeController@index',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveTypeController@index',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'hr/leaves/leaves',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'leaves.types.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/leaves/leaves/types/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'can:manage-leave-types',
        ),
        'as' => 'leaves.types.create',
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveTypeController@create',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveTypeController@create',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'hr/leaves/leaves',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'leaves.types.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'hr/leaves/leaves/types',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'can:manage-leave-types',
        ),
        'as' => 'leaves.types.store',
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveTypeController@store',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveTypeController@store',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'hr/leaves/leaves',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'leaves.types.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/leaves/leaves/types/{type}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'can:manage-leave-types',
        ),
        'as' => 'leaves.types.show',
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveTypeController@show',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveTypeController@show',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'hr/leaves/leaves',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'leaves.types.edit' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/leaves/leaves/types/{type}/edit',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'can:manage-leave-types',
        ),
        'as' => 'leaves.types.edit',
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveTypeController@edit',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveTypeController@edit',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'hr/leaves/leaves',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'leaves.types.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
        1 => 'PATCH',
      ),
      'uri' => 'hr/leaves/leaves/types/{type}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'can:manage-leave-types',
        ),
        'as' => 'leaves.types.update',
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveTypeController@update',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveTypeController@update',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'hr/leaves/leaves',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'leaves.types.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'hr/leaves/leaves/types/{type}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'can:manage-leave-types',
        ),
        'as' => 'leaves.types.destroy',
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveTypeController@destroy',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveTypeController@destroy',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'hr/leaves/leaves',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'leaves.reports.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/leaves/leaves/reports',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveReportController@index',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveReportController@index',
        'as' => 'leaves.reports.index',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'hr/leaves/leaves',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'leaves.reports.generate' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'hr/leaves/leaves/reports/generate',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveReportController@generate',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveReportController@generate',
        'as' => 'leaves.reports.generate',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'hr/leaves/leaves',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'leaves.reports.export' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/leaves/leaves/reports/export',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveReportController@export',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveReportController@export',
        'as' => 'leaves.reports.export',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'hr/leaves/leaves',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'leaves.settings.edit' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/leaves/leaves/settings',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'can:manage-leave-settings',
        ),
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveSettingController@edit',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveSettingController@edit',
        'as' => 'leaves.settings.edit',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'hr/leaves/leaves',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'leaves.settings.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'hr/leaves/leaves/settings',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'can:manage-leave-settings',
        ),
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveSettingController@update',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveSettingController@update',
        'as' => 'leaves.settings.update',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'hr/leaves/leaves',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'leaves.leave-requests.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/leaves/leaves/leave-requests/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'permission:leave-requests.create',
        ),
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@create',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@create',
        'as' => 'leaves.leave-requests.create',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'hr/leaves/leaves',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'leaves.leave-requests.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'hr/leaves/leaves/leave-requests',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'permission:leave-requests.create',
        ),
        'uses' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@store',
        'controller' => 'Modules\\LeaveManagement\\Http\\Controllers\\LeaveRequestController@store',
        'as' => 'leaves.leave-requests.store',
        'namespace' => 'Modules\\LeaveManagement\\Http\\Controllers',
        'prefix' => 'hr/leaves/leaves',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/payroll',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\PayrollController@index',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\PayrollController@index',
        'as' => 'payroll.index',
        'namespace' => NULL,
        'prefix' => 'hr/payroll',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/payroll/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\PayrollController@create',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\PayrollController@create',
        'as' => 'payroll.create',
        'namespace' => NULL,
        'prefix' => 'hr/payroll',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'hr/payroll',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\PayrollController@store',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\PayrollController@store',
        'as' => 'payroll.store',
        'namespace' => NULL,
        'prefix' => 'hr/payroll',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/payroll/{payroll}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\PayrollController@show',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\PayrollController@show',
        'as' => 'payroll.show',
        'namespace' => NULL,
        'prefix' => 'hr/payroll',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.approve' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'hr/payroll/{payroll}/approve',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\PayrollController@approve',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\PayrollController@approve',
        'as' => 'payroll.approve',
        'namespace' => NULL,
        'prefix' => 'hr/payroll',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.process-payment' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'hr/payroll/{payroll}/process-payment',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\PayrollController@processPayment',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\PayrollController@processPayment',
        'as' => 'payroll.process-payment',
        'namespace' => NULL,
        'prefix' => 'hr/payroll',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.cancel' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'hr/payroll/{payroll}/cancel',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\PayrollController@cancel',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\PayrollController@cancel',
        'as' => 'payroll.cancel',
        'namespace' => NULL,
        'prefix' => 'hr/payroll',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.generate-monthly' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'hr/payroll/generate-monthly',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\PayrollController@generateMonthlyPayroll',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\PayrollController@generateMonthlyPayroll',
        'as' => 'payroll.generate-monthly',
        'namespace' => NULL,
        'prefix' => 'hr/payroll',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.runs.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/payroll/runs/{payrollRun}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\PayrollController@showPayrollRun',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\PayrollController@showPayrollRun',
        'as' => 'payroll.runs.show',
        'namespace' => NULL,
        'prefix' => 'hr/payroll/runs',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.runs.approve' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'hr/payroll/runs/{payrollRun}/approve',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\PayrollController@approvePayrollRun',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\PayrollController@approvePayrollRun',
        'as' => 'payroll.runs.approve',
        'namespace' => NULL,
        'prefix' => 'hr/payroll/runs',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.runs.reject' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'hr/payroll/runs/{payrollRun}/reject',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\PayrollController@rejectPayrollRun',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\PayrollController@rejectPayrollRun',
        'as' => 'payroll.runs.reject',
        'namespace' => NULL,
        'prefix' => 'hr/payroll/runs',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.salary-advances.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/payroll/salary-advances',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'as' => 'payroll.salary-advances.index',
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\SalaryAdvanceController@index',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\SalaryAdvanceController@index',
        'namespace' => NULL,
        'prefix' => 'hr/payroll',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.salary-advances.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/payroll/salary-advances/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'as' => 'payroll.salary-advances.create',
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\SalaryAdvanceController@create',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\SalaryAdvanceController@create',
        'namespace' => NULL,
        'prefix' => 'hr/payroll',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.salary-advances.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'hr/payroll/salary-advances',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'as' => 'payroll.salary-advances.store',
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\SalaryAdvanceController@store',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\SalaryAdvanceController@store',
        'namespace' => NULL,
        'prefix' => 'hr/payroll',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.salary-advances.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/payroll/salary-advances/{salary_advance}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'as' => 'payroll.salary-advances.show',
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\SalaryAdvanceController@show',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\SalaryAdvanceController@show',
        'namespace' => NULL,
        'prefix' => 'hr/payroll',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.salary-advances.edit' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/payroll/salary-advances/{salary_advance}/edit',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'as' => 'payroll.salary-advances.edit',
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\SalaryAdvanceController@edit',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\SalaryAdvanceController@edit',
        'namespace' => NULL,
        'prefix' => 'hr/payroll',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.salary-advances.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
        1 => 'PATCH',
      ),
      'uri' => 'hr/payroll/salary-advances/{salary_advance}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'as' => 'payroll.salary-advances.update',
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\SalaryAdvanceController@update',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\SalaryAdvanceController@update',
        'namespace' => NULL,
        'prefix' => 'hr/payroll',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.salary-advances.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'hr/payroll/salary-advances/{salary_advance}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'as' => 'payroll.salary-advances.destroy',
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\SalaryAdvanceController@destroy',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\SalaryAdvanceController@destroy',
        'namespace' => NULL,
        'prefix' => 'hr/payroll',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.salary-advances.approve' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'hr/payroll/salary-advances/{salaryAdvance}/approve',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\SalaryAdvanceController@approve',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\SalaryAdvanceController@approve',
        'as' => 'payroll.salary-advances.approve',
        'namespace' => NULL,
        'prefix' => 'hr/payroll',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.salary-advances.reject' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'hr/payroll/salary-advances/{salaryAdvance}/reject',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\SalaryAdvanceController@reject',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\SalaryAdvanceController@reject',
        'as' => 'payroll.salary-advances.reject',
        'namespace' => NULL,
        'prefix' => 'hr/payroll',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.final-settlements.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/payroll/final-settlements',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\FinalSettlementController@index',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\FinalSettlementController@index',
        'as' => 'payroll.final-settlements.index',
        'namespace' => NULL,
        'prefix' => 'hr/payroll/final-settlements',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.final-settlements.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/payroll/final-settlements/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\FinalSettlementController@create',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\FinalSettlementController@create',
        'as' => 'payroll.final-settlements.create',
        'namespace' => NULL,
        'prefix' => 'hr/payroll/final-settlements',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.final-settlements.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'hr/payroll/final-settlements',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\FinalSettlementController@store',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\FinalSettlementController@store',
        'as' => 'payroll.final-settlements.store',
        'namespace' => NULL,
        'prefix' => 'hr/payroll/final-settlements',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.final-settlements.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/payroll/final-settlements/{finalSettlement}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\FinalSettlementController@show',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\FinalSettlementController@show',
        'as' => 'payroll.final-settlements.show',
        'namespace' => NULL,
        'prefix' => 'hr/payroll/final-settlements',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.final-settlements.approve' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'hr/payroll/final-settlements/{finalSettlement}/approve',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\FinalSettlementController@approve',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\FinalSettlementController@approve',
        'as' => 'payroll.final-settlements.approve',
        'namespace' => NULL,
        'prefix' => 'hr/payroll/final-settlements',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.final-settlements.mark-as-paid' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'hr/payroll/final-settlements/{finalSettlement}/mark-as-paid',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\FinalSettlementController@processPayment',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\FinalSettlementController@processPayment',
        'as' => 'payroll.final-settlements.mark-as-paid',
        'namespace' => NULL,
        'prefix' => 'hr/payroll/final-settlements',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.final-settlements.cancel' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'hr/payroll/final-settlements/{finalSettlement}/cancel',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\FinalSettlementController@cancel',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\FinalSettlementController@cancel',
        'as' => 'payroll.final-settlements.cancel',
        'namespace' => NULL,
        'prefix' => 'hr/payroll/final-settlements',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.final-settlements.report' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/payroll/final-settlements/{finalSettlement}/report',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\FinalSettlementController@generateReport',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\FinalSettlementController@generateReport',
        'as' => 'payroll.final-settlements.report',
        'namespace' => NULL,
        'prefix' => 'hr/payroll/final-settlements',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.employees.advances.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/payroll/employees/{employee}/advances',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@index',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@index',
        'as' => 'payroll.employees.advances.index',
        'namespace' => NULL,
        'prefix' => 'hr/payroll/employees/{employee}/advances',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.employees.advances.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'hr/payroll/employees/{employee}/advances',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
          2 => 'permission:advances.create',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@store',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@store',
        'as' => 'payroll.employees.advances.store',
        'namespace' => NULL,
        'prefix' => 'hr/payroll/employees/{employee}/advances',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.employees.advances.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/payroll/employees/{employee}/advances/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
          2 => 'permission:advances.create',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@create',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@create',
        'as' => 'payroll.employees.advances.create',
        'namespace' => NULL,
        'prefix' => 'hr/payroll/employees/{employee}/advances',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.employees.advances.payment-history' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/payroll/employees/{employee}/advances/history',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@paymentHistory',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@paymentHistory',
        'as' => 'payroll.employees.advances.payment-history',
        'namespace' => NULL,
        'prefix' => 'hr/payroll/employees/{employee}/advances',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.employees.advances.payment-history.api' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/payroll/employees/{employee}/advances/history/api',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@apiPaymentHistory',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@apiPaymentHistory',
        'as' => 'payroll.employees.advances.payment-history.api',
        'namespace' => NULL,
        'prefix' => 'hr/payroll/employees/{employee}/advances',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.employees.advances.payment-history.delete' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'hr/payroll/employees/{employee}/advances/history/{payment}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
          2 => 'permission:advances.delete',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@deletePaymentHistory',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@deletePaymentHistory',
        'as' => 'payroll.employees.advances.payment-history.delete',
        'namespace' => NULL,
        'prefix' => 'hr/payroll/employees/{employee}/advances',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.employees.advances.monthly-deduction' => 
    array (
      'methods' => 
      array (
        0 => 'PATCH',
      ),
      'uri' => 'hr/payroll/employees/{employee}/advances/monthly-deduction',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
          2 => 'permission:advances.edit',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@updateMonthlyDeduction',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@updateMonthlyDeduction',
        'as' => 'payroll.employees.advances.monthly-deduction',
        'namespace' => NULL,
        'prefix' => 'hr/payroll/employees/{employee}/advances',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.employees.advances.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/payroll/employees/{employee}/advances/{advance}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@show',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@show',
        'as' => 'payroll.employees.advances.show',
        'namespace' => NULL,
        'prefix' => 'hr/payroll/employees/{employee}/advances',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.employees.advances.edit' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/payroll/employees/{employee}/advances/{advance}/edit',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
          2 => 'permission:advances.edit',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@edit',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@edit',
        'as' => 'payroll.employees.advances.edit',
        'namespace' => NULL,
        'prefix' => 'hr/payroll/employees/{employee}/advances',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.employees.advances.update' => 
    array (
      'methods' => 
      array (
        0 => 'PATCH',
      ),
      'uri' => 'hr/payroll/employees/{employee}/advances/{advance}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
          2 => 'permission:advances.edit',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@update',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@update',
        'as' => 'payroll.employees.advances.update',
        'namespace' => NULL,
        'prefix' => 'hr/payroll/employees/{employee}/advances',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.employees.advances.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'hr/payroll/employees/{employee}/advances/{advance}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
          2 => 'permission:advances.delete',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@destroy',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@destroy',
        'as' => 'payroll.employees.advances.destroy',
        'namespace' => NULL,
        'prefix' => 'hr/payroll/employees/{employee}/advances',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.employees.advances.repayment' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'hr/payroll/employees/{employee}/advances/{advance}/repayment',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
          2 => 'permission:advances.edit',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@recordRepayment',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@recordRepayment',
        'as' => 'payroll.employees.advances.repayment',
        'namespace' => NULL,
        'prefix' => 'hr/payroll/employees/{employee}/advances',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.employees.advances.approve' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'hr/payroll/employees/{employee}/advances/{advance}/approve',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
          2 => 'permission:advances.approve',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@approve',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@approve',
        'as' => 'payroll.employees.advances.approve',
        'namespace' => NULL,
        'prefix' => 'hr/payroll/employees/{employee}/advances',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.employees.advances.reject' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'hr/payroll/employees/{employee}/advances/{advance}/reject',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
          2 => 'permission:advances.approve',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@reject',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@reject',
        'as' => 'payroll.employees.advances.reject',
        'namespace' => NULL,
        'prefix' => 'hr/payroll/employees/{employee}/advances',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.employees.advances.payment.receipt' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/payroll/employees/{employee}/advances/payment/{payment}/receipt',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@receipt',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@receipt',
        'as' => 'payroll.employees.advances.payment.receipt',
        'namespace' => NULL,
        'prefix' => 'hr/payroll/employees/{employee}/advances',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'payroll.advance-payments.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/payroll/advance-payments',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'auth',
          1 => 'verified',
        ),
        'uses' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@allAdvances',
        'controller' => 'Modules\\Payroll\\Http\\Controllers\\AdvancePaymentController@allAdvances',
        'as' => 'payroll.advance-payments.index',
        'namespace' => NULL,
        'prefix' => 'hr/payroll',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::kNMO4G0EAgCHHPKb' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/v1/projects',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\Api\\ProjectApiController@index',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\Api\\ProjectApiController@index',
        'namespace' => NULL,
        'prefix' => 'api/v1/projects',
        'where' => 
        array (
        ),
        'as' => 'generated::kNMO4G0EAgCHHPKb',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::mvsPhikYKNIy5r98' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/v1/projects',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\Api\\ProjectApiController@store',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\Api\\ProjectApiController@store',
        'namespace' => NULL,
        'prefix' => 'api/v1/projects',
        'where' => 
        array (
        ),
        'as' => 'generated::mvsPhikYKNIy5r98',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::gxAo2u6h7W6sSfC3' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/v1/projects/{project}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\Api\\ProjectApiController@show',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\Api\\ProjectApiController@show',
        'namespace' => NULL,
        'prefix' => 'api/v1/projects',
        'where' => 
        array (
        ),
        'as' => 'generated::gxAo2u6h7W6sSfC3',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::eox8hC0B4PJlyxAx' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'api/v1/projects/{project}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\Api\\ProjectApiController@update',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\Api\\ProjectApiController@update',
        'namespace' => NULL,
        'prefix' => 'api/v1/projects',
        'where' => 
        array (
        ),
        'as' => 'generated::eox8hC0B4PJlyxAx',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::lQRJe6J3Ti0Ey0RE' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'api/v1/projects/{project}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\Api\\ProjectApiController@destroy',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\Api\\ProjectApiController@destroy',
        'namespace' => NULL,
        'prefix' => 'api/v1/projects',
        'where' => 
        array (
        ),
        'as' => 'generated::lQRJe6J3Ti0Ey0RE',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'projects/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectController@create',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectController@create',
        'as' => 'projects.create',
        'namespace' => NULL,
        'prefix' => '/projects',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'projects',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectController@store',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectController@store',
        'as' => 'projects.store',
        'namespace' => NULL,
        'prefix' => '/projects',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'projects/{project}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectController@show',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectController@show',
        'as' => 'projects.show',
        'namespace' => NULL,
        'prefix' => '/projects',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
        'project' => '[0-9]+',
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.edit' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'projects/{project}/edit',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectController@edit',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectController@edit',
        'as' => 'projects.edit',
        'namespace' => NULL,
        'prefix' => '/projects',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
        'project' => '[0-9]+',
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'projects/{project}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectController@update',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectController@update',
        'as' => 'projects.update',
        'namespace' => NULL,
        'prefix' => '/projects',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
        'project' => '[0-9]+',
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'projects/{project}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectController@destroy',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectController@destroy',
        'as' => 'projects.destroy',
        'namespace' => NULL,
        'prefix' => '/projects',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
        'project' => '[0-9]+',
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.progress.demo' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'projects/progress/demo',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'O:55:"Laravel\\SerializableClosure\\UnsignedSerializableClosure":1:{s:12:"serializable";O:46:"Laravel\\SerializableClosure\\Serializers\\Native":5:{s:3:"use";a:0:{}s:8:"function";s:82:"function() {
        return \\Inertia\\Inertia::render(\'ProjectProgressDemo\');
    }";s:5:"scope";s:37:"Illuminate\\Routing\\RouteFileRegistrar";s:4:"this";N;s:4:"self";s:32:"0000000000000bf20000000000000000";}}',
        'as' => 'projects.progress.demo',
        'namespace' => NULL,
        'prefix' => '/projects',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.resources' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'projects/{project}/resources',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@index',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@index',
        'as' => 'projects.resources',
        'namespace' => NULL,
        'prefix' => '/projects',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.resources.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'projects/{project}/resources/{resource}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@destroy',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@destroy',
        'as' => 'projects.resources.destroy',
        'namespace' => NULL,
        'prefix' => '/projects',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.tasks.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'projects/{project}/tasks',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\TaskController@index',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\TaskController@index',
        'as' => 'projects.tasks.index',
        'namespace' => NULL,
        'prefix' => '/projects',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.tasks.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'projects/{project}/tasks',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\TaskController@store',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\TaskController@store',
        'as' => 'projects.tasks.store',
        'namespace' => NULL,
        'prefix' => '/projects',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.tasks.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'projects/{project}/tasks/{task}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\TaskController@update',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\TaskController@update',
        'as' => 'projects.tasks.update',
        'namespace' => NULL,
        'prefix' => '/projects',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
        'task' => '[0-9]+',
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.tasks.status' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'projects/{project}/tasks/{task}/status',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\TaskController@updateStatus',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\TaskController@updateStatus',
        'as' => 'projects.tasks.status',
        'namespace' => NULL,
        'prefix' => '/projects',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
        'task' => '[0-9]+',
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.tasks.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'projects/{project}/tasks/{task}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\TaskController@destroy',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\TaskController@destroy',
        'as' => 'projects.tasks.destroy',
        'namespace' => NULL,
        'prefix' => '/projects',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
        'task' => '[0-9]+',
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.resources.manpower.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'projects/{project}/resources/manpower',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\ManpowerController@index',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\ManpowerController@index',
        'as' => 'projects.resources.manpower.index',
        'namespace' => NULL,
        'prefix' => 'projects/{project}/resources',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.resources.manpower.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'projects/{project}/resources/manpower',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@storeManpower',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@storeManpower',
        'as' => 'projects.resources.manpower.store',
        'namespace' => NULL,
        'prefix' => 'projects/{project}/resources',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.resources.manpower.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'projects/{project}/resources/manpower/{manpower}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@updateManpower',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@updateManpower',
        'as' => 'projects.resources.manpower.update',
        'namespace' => NULL,
        'prefix' => 'projects/{project}/resources',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.resources.manpower.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'projects/{project}/resources/manpower/{manpower}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@destroyManpower',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@destroyManpower',
        'as' => 'projects.resources.manpower.destroy',
        'namespace' => NULL,
        'prefix' => 'projects/{project}/resources',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.resources.equipment.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'projects/{project}/resources/equipment',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\EquipmentController@index',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\EquipmentController@index',
        'as' => 'projects.resources.equipment.index',
        'namespace' => NULL,
        'prefix' => 'projects/{project}/resources',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.resources.equipment.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'projects/{project}/resources/equipment',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@storeEquipment',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@storeEquipment',
        'as' => 'projects.resources.equipment.store',
        'namespace' => NULL,
        'prefix' => 'projects/{project}/resources',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.resources.equipment.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'projects/{project}/resources/equipment/{equipment}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@updateEquipment',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@updateEquipment',
        'as' => 'projects.resources.equipment.update',
        'namespace' => NULL,
        'prefix' => 'projects/{project}/resources',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.resources.equipment.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'projects/{project}/resources/equipment/{equipment}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@destroyEquipment',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@destroyEquipment',
        'as' => 'projects.resources.equipment.destroy',
        'namespace' => NULL,
        'prefix' => 'projects/{project}/resources',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.resources.material.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'projects/{project}/resources/material',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\MaterialController@index',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\MaterialController@index',
        'as' => 'projects.resources.material.index',
        'namespace' => NULL,
        'prefix' => 'projects/{project}/resources',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.resources.material.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'projects/{project}/resources/material',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@storeMaterial',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@storeMaterial',
        'as' => 'projects.resources.material.store',
        'namespace' => NULL,
        'prefix' => 'projects/{project}/resources',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.resources.material.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'projects/{project}/resources/material/{material}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@updateMaterial',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@updateMaterial',
        'as' => 'projects.resources.material.update',
        'namespace' => NULL,
        'prefix' => 'projects/{project}/resources',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.resources.material.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'projects/{project}/resources/material/{material}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@destroyMaterial',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@destroyMaterial',
        'as' => 'projects.resources.material.destroy',
        'namespace' => NULL,
        'prefix' => 'projects/{project}/resources',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.resources.fuel.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'projects/{project}/resources/fuel',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\FuelController@index',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\FuelController@index',
        'as' => 'projects.resources.fuel.index',
        'namespace' => NULL,
        'prefix' => 'projects/{project}/resources',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.resources.fuel.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'projects/{project}/resources/fuel',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@storeFuel',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@storeFuel',
        'as' => 'projects.resources.fuel.store',
        'namespace' => NULL,
        'prefix' => 'projects/{project}/resources',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.resources.fuel.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'projects/{project}/resources/fuel/{fuel}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@updateFuel',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@updateFuel',
        'as' => 'projects.resources.fuel.update',
        'namespace' => NULL,
        'prefix' => 'projects/{project}/resources',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.resources.fuel.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'projects/{project}/resources/fuel/{fuel}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@destroyFuel',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@destroyFuel',
        'as' => 'projects.resources.fuel.destroy',
        'namespace' => NULL,
        'prefix' => 'projects/{project}/resources',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.resources.expense.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'projects/{project}/resources/expense',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\ExpenseController@index',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\ExpenseController@index',
        'as' => 'projects.resources.expense.index',
        'namespace' => NULL,
        'prefix' => 'projects/{project}/resources',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.resources.expense.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'projects/{project}/resources/expense',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@storeExpense',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@storeExpense',
        'as' => 'projects.resources.expense.store',
        'namespace' => NULL,
        'prefix' => 'projects/{project}/resources',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.resources.expense.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'projects/{project}/resources/expense/{expense}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@updateExpense',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@updateExpense',
        'as' => 'projects.resources.expense.update',
        'namespace' => NULL,
        'prefix' => 'projects/{project}/resources',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.resources.expense.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'projects/{project}/resources/expense/{expense}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@destroyExpense',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@destroyExpense',
        'as' => 'projects.resources.expense.destroy',
        'namespace' => NULL,
        'prefix' => 'projects/{project}/resources',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'projects.resources.resource.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'projects/{project}/resources/{type}/{resource}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
        ),
        'uses' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@destroyResource',
        'controller' => 'Modules\\ProjectManagement\\Http\\Controllers\\ProjectResourceController@destroyResource',
        'as' => 'projects.resources.resource.destroy',
        'namespace' => NULL,
        'prefix' => 'projects/{project}/resources',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.customers.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/customers',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.customers.index',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\CustomerController@index',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\CustomerController@index',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.customers.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/customers/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.customers.create',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\CustomerController@create',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\CustomerController@create',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.customers.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'rentals/customers',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.customers.store',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\CustomerController@store',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\CustomerController@store',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.customers.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/customers/{customer}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.customers.show',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\CustomerController@show',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\CustomerController@show',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.customers.edit' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/customers/{customer}/edit',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.customers.edit',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\CustomerController@edit',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\CustomerController@edit',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.customers.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
        1 => 'PATCH',
      ),
      'uri' => 'rentals/customers/{customer}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.customers.update',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\CustomerController@update',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\CustomerController@update',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.customers.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'rentals/customers/{customer}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.customers.destroy',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\CustomerController@destroy',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\CustomerController@destroy',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.customers.report' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/customers-report',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\CustomerController@report',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\CustomerController@report',
        'as' => 'rentals.customers.report',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.api.customers' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/api/customers',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\CustomerController@getCustomers',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\CustomerController@getCustomers',
        'as' => 'rentals.api.customers',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/rentals',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'permission:rentals.view',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalController@index',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalController@index',
        'as' => 'rentals.index',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/rentals/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'permission:rentals.create',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalController@create',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalController@create',
        'as' => 'rentals.create',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'rentals/rentals',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'permission:rentals.create',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalController@store',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalController@store',
        'as' => 'rentals.store',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/rentals/{rental}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'permission:rentals.view',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalController@show',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalController@show',
        'as' => 'rentals.show',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.edit' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/rentals/{rental}/edit',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'permission:rentals.edit|rentals.update',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalController@edit',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalController@edit',
        'as' => 'rentals.edit',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.rentals.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
        1 => 'PATCH',
      ),
      'uri' => 'rentals/rentals/{rental}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.rentals.update',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalController@update',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalController@update',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'rentals/rentals/{rental}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'permission:rentals.delete',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalController@destroy',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalController@destroy',
        'as' => 'rentals.destroy',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.extensions.approve' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'rentals/extensions/{extension}/approve',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'permission:rentals.approve',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalExtensionController@approve',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalExtensionController@approve',
        'as' => 'rentals.extensions.approve',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.extensions.reject' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'rentals/extensions/{extension}/reject',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'permission:rentals.approve',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalExtensionController@reject',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalExtensionController@reject',
        'as' => 'rentals.extensions.reject',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.invoices.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/invoices',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.invoices.index',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\InvoiceController@index',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\InvoiceController@index',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.invoices.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/invoices/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.invoices.create',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\InvoiceController@create',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\InvoiceController@create',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.invoices.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'rentals/invoices',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.invoices.store',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\InvoiceController@store',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\InvoiceController@store',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.invoices.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/invoices/{invoice}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.invoices.show',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\InvoiceController@show',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\InvoiceController@show',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.invoices.edit' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/invoices/{invoice}/edit',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.invoices.edit',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\InvoiceController@edit',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\InvoiceController@edit',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.invoices.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
        1 => 'PATCH',
      ),
      'uri' => 'rentals/invoices/{invoice}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.invoices.update',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\InvoiceController@update',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\InvoiceController@update',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.invoices.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'rentals/invoices/{invoice}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.invoices.destroy',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\InvoiceController@destroy',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\InvoiceController@destroy',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.invoices.documents.remove' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'rentals/invoices/{invoice}/documents/{documentId}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\InvoiceController@removeDocument',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\InvoiceController@removeDocument',
        'as' => 'rentals.invoices.documents.remove',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.quotations.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/quotations',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.quotations.index',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\QuotationController@index',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\QuotationController@index',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.quotations.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/quotations/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.quotations.create',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\QuotationController@create',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\QuotationController@create',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.quotations.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'rentals/quotations',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.quotations.store',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\QuotationController@store',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\QuotationController@store',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.quotations.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/quotations/{quotation}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.quotations.show',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\QuotationController@show',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\QuotationController@show',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.quotations.edit' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/quotations/{quotation}/edit',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.quotations.edit',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\QuotationController@edit',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\QuotationController@edit',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.quotations.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
        1 => 'PATCH',
      ),
      'uri' => 'rentals/quotations/{quotation}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.quotations.update',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\QuotationController@update',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\QuotationController@update',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.quotations.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'rentals/quotations/{quotation}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.quotations.destroy',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\QuotationController@destroy',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\QuotationController@destroy',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.quotations.approve' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'rentals/quotations/{quotation}/approve',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\QuotationController@approve',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\QuotationController@approve',
        'as' => 'rentals.quotations.approve',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.quotations.reject' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'rentals/quotations/{quotation}/reject',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\QuotationController@reject',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\QuotationController@reject',
        'as' => 'rentals.quotations.reject',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.rentals.payments.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/rentals/{rental}/payments',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.rentals.payments.index',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\PaymentController@index',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\PaymentController@index',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.rentals.payments.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/rentals/{rental}/payments/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.rentals.payments.create',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\PaymentController@create',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\PaymentController@create',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.rentals.payments.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'rentals/rentals/{rental}/payments',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.rentals.payments.store',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\PaymentController@store',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\PaymentController@store',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.rentals.payments.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/rentals/{rental}/payments/{payment}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.rentals.payments.show',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\PaymentController@show',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\PaymentController@show',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.rentals.payments.edit' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/rentals/{rental}/payments/{payment}/edit',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.rentals.payments.edit',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\PaymentController@edit',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\PaymentController@edit',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.rentals.payments.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
        1 => 'PATCH',
      ),
      'uri' => 'rentals/rentals/{rental}/payments/{payment}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.rentals.payments.update',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\PaymentController@update',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\PaymentController@update',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.rentals.payments.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'rentals/rentals/{rental}/payments/{payment}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.rentals.payments.destroy',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\PaymentController@destroy',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\PaymentController@destroy',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.rentals.items.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/rentals/{rental}/items',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.rentals.items.index',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalItemController@index',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalItemController@index',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.rentals.items.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/rentals/{rental}/items/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.rentals.items.create',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalItemController@create',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalItemController@create',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.rentals.items.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'rentals/rentals/{rental}/items',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.rentals.items.store',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalItemController@store',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalItemController@store',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.rentals.items.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/rentals/{rental}/items/{item}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.rentals.items.show',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalItemController@show',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalItemController@show',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.rentals.items.edit' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/rentals/{rental}/items/{item}/edit',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.rentals.items.edit',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalItemController@edit',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalItemController@edit',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.rentals.items.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
        1 => 'PATCH',
      ),
      'uri' => 'rentals/rentals/{rental}/items/{item}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.rentals.items.update',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalItemController@update',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalItemController@update',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.rentals.items.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'rentals/rentals/{rental}/items/{item}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'as' => 'rentals.rentals.items.destroy',
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalItemController@destroy',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalItemController@destroy',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.rentals.items.bulk-create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/rentals/{rental}/items/bulk-create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalItemController@bulkCreate',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalItemController@bulkCreate',
        'as' => 'rentals.rentals.items.bulk-create',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.rentals.items.bulk-store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'rentals/rentals/{rental}/items/bulk',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalItemController@bulkStore',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalItemController@bulkStore',
        'as' => 'rentals.rentals.items.bulk-store',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.analytics.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/rentals/analytics',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalAnalyticsController@index',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalAnalyticsController@index',
        'as' => 'rentals.analytics.index',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.extensions.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/extensions',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'permission:rentals.view',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalExtensionController@index',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalExtensionController@index',
        'as' => 'rentals.extensions.index',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.extensions.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/extensions/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'permission:rentals.create',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalExtensionController@create',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalExtensionController@create',
        'as' => 'rentals.extensions.create',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.extensions.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'rentals/extensions',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'permission:rentals.create',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalExtensionController@store',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalExtensionController@store',
        'as' => 'rentals.extensions.store',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.extensions.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/extensions/{extension}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'permission:rentals.view',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalExtensionController@show',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalExtensionController@show',
        'as' => 'rentals.extensions.show',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.extensions.edit' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/extensions/{extension}/edit',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'permission:rentals.edit',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalExtensionController@edit',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalExtensionController@edit',
        'as' => 'rentals.extensions.edit',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.extensions.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'rentals/extensions/{extension}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'permission:rentals.edit',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalExtensionController@update',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalExtensionController@update',
        'as' => 'rentals.extensions.update',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.extensions.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'rentals/extensions/{extension}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'permission:rentals.delete',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalExtensionController@destroy',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalExtensionController@destroy',
        'as' => 'rentals.extensions.destroy',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.rental-timesheets.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/rental-timesheets',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'permission:rental-timesheets.view',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalTimesheetController@index',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalTimesheetController@index',
        'as' => 'rentals.rental-timesheets.index',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.rental-timesheets.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/rental-timesheets/{rentalTimesheet}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'permission:rental-timesheets.view',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalTimesheetController@show',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalTimesheetController@show',
        'as' => 'rentals.rental-timesheets.show',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.timesheets' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/rentals/{rental}/timesheets',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'permission:rental-timesheets.view',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalTimesheetController@forRental',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalTimesheetController@forRental',
        'as' => 'rentals.timesheets',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.rental-timesheets.check-missing' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/rentals/{rental}/check-missing-timesheets',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'permission:rental-timesheets.view',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalTimesheetController@checkMissingTimesheets',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalTimesheetController@checkMissingTimesheets',
        'as' => 'rentals.rental-timesheets.check-missing',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.rental-timesheets.check-operator-availability' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/rentals/{rental}/check-operator-availability',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'permission:rental-timesheets.view',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalTimesheetController@checkOperatorAvailability',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalTimesheetController@checkOperatorAvailability',
        'as' => 'rentals.rental-timesheets.check-operator-availability',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'rentals/rentals/{rental}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'permission:rentals.edit|rentals.update',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalController@update',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalController@update',
        'as' => 'rentals.update',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.report' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/rentals-report',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'permission:rentals.view',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalController@report',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalController@report',
        'as' => 'rentals.report',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'rentals.print' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'rentals/rentals/{rental}/print',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'permission:rentals.view',
        ),
        'uses' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalController@print',
        'controller' => 'Modules\\RentalManagement\\Http\\Controllers\\RentalController@print',
        'as' => 'rentals.print',
        'namespace' => NULL,
        'prefix' => 'rentals',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'reports.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'reports',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
          4 => 'permission:reports.view',
        ),
        'uses' => 'Modules\\Reporting\\Http\\Controllers\\ReportController@index',
        'controller' => 'Modules\\Reporting\\Http\\Controllers\\ReportController@index',
        'as' => 'reports.index',
        'namespace' => NULL,
        'prefix' => '/reports',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'reports.clients' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'reports/clients',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
          4 => 'permission:reports.view',
        ),
        'uses' => 'Modules\\Reporting\\Http\\Controllers\\ReportController@clients',
        'controller' => 'Modules\\Reporting\\Http\\Controllers\\ReportController@clients',
        'as' => 'reports.clients',
        'namespace' => NULL,
        'prefix' => '/reports',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'reports.rentals' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'reports/rentals',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
          4 => 'permission:reports.view',
        ),
        'uses' => 'Modules\\Reporting\\Http\\Controllers\\ReportController@rentals',
        'controller' => 'Modules\\Reporting\\Http\\Controllers\\ReportController@rentals',
        'as' => 'reports.rentals',
        'namespace' => NULL,
        'prefix' => '/reports',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'reports.invoices' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'reports/invoices',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
          4 => 'permission:reports.view',
        ),
        'uses' => 'Modules\\Reporting\\Http\\Controllers\\ReportController@invoices',
        'controller' => 'Modules\\Reporting\\Http\\Controllers\\ReportController@invoices',
        'as' => 'reports.invoices',
        'namespace' => NULL,
        'prefix' => '/reports',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'reports.payments' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'reports/payments',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
          4 => 'permission:reports.view',
        ),
        'uses' => 'Modules\\Reporting\\Http\\Controllers\\ReportController@payments',
        'controller' => 'Modules\\Reporting\\Http\\Controllers\\ReportController@payments',
        'as' => 'reports.payments',
        'namespace' => NULL,
        'prefix' => '/reports',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'reports.equipment' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'reports/equipment',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
          4 => 'permission:reports.view',
        ),
        'uses' => 'Modules\\Reporting\\Http\\Controllers\\ReportController@equipment',
        'controller' => 'Modules\\Reporting\\Http\\Controllers\\ReportController@equipment',
        'as' => 'reports.equipment',
        'namespace' => NULL,
        'prefix' => '/reports',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'reports.revenue' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'reports/revenue',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
          4 => 'permission:reports.view',
        ),
        'uses' => 'Modules\\Reporting\\Http\\Controllers\\ReportController@revenue',
        'controller' => 'Modules\\Reporting\\Http\\Controllers\\ReportController@revenue',
        'as' => 'reports.revenue',
        'namespace' => NULL,
        'prefix' => '/reports',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'settings.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'settings/settings',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
        ),
        'uses' => 'Modules\\Settings\\Http\\Controllers\\SettingController@index',
        'controller' => 'Modules\\Settings\\Http\\Controllers\\SettingController@index',
        'as' => 'settings.index',
        'namespace' => 'Modules\\Settings\\Http\\Controllers',
        'prefix' => 'settings/settings',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'settings.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'settings/settings/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
        ),
        'uses' => 'Modules\\Settings\\Http\\Controllers\\SettingController@create',
        'controller' => 'Modules\\Settings\\Http\\Controllers\\SettingController@create',
        'as' => 'settings.create',
        'namespace' => 'Modules\\Settings\\Http\\Controllers',
        'prefix' => 'settings/settings',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'settings.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'settings/settings',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
        ),
        'uses' => 'Modules\\Settings\\Http\\Controllers\\SettingController@store',
        'controller' => 'Modules\\Settings\\Http\\Controllers\\SettingController@store',
        'as' => 'settings.store',
        'namespace' => 'Modules\\Settings\\Http\\Controllers',
        'prefix' => 'settings/settings',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'settings.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'settings/settings/{setting}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
        ),
        'uses' => 'Modules\\Settings\\Http\\Controllers\\SettingController@show',
        'controller' => 'Modules\\Settings\\Http\\Controllers\\SettingController@show',
        'as' => 'settings.show',
        'namespace' => 'Modules\\Settings\\Http\\Controllers',
        'prefix' => 'settings/settings',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'settings.edit' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'settings/settings/{setting}/edit',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
        ),
        'uses' => 'Modules\\Settings\\Http\\Controllers\\SettingController@edit',
        'controller' => 'Modules\\Settings\\Http\\Controllers\\SettingController@edit',
        'as' => 'settings.edit',
        'namespace' => 'Modules\\Settings\\Http\\Controllers',
        'prefix' => 'settings/settings',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'settings.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'settings/settings/{setting}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
        ),
        'uses' => 'Modules\\Settings\\Http\\Controllers\\SettingController@update',
        'controller' => 'Modules\\Settings\\Http\\Controllers\\SettingController@update',
        'as' => 'settings.update',
        'namespace' => 'Modules\\Settings\\Http\\Controllers',
        'prefix' => 'settings/settings',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'settings.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'settings/settings/{setting}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
        ),
        'uses' => 'Modules\\Settings\\Http\\Controllers\\SettingController@destroy',
        'controller' => 'Modules\\Settings\\Http\\Controllers\\SettingController@destroy',
        'as' => 'settings.destroy',
        'namespace' => 'Modules\\Settings\\Http\\Controllers',
        'prefix' => 'settings/settings',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'settings.bulk-update' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'settings/settings/bulk-update',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
        ),
        'uses' => 'Modules\\Settings\\Http\\Controllers\\SettingController@bulkUpdate',
        'controller' => 'Modules\\Settings\\Http\\Controllers\\SettingController@bulkUpdate',
        'as' => 'settings.bulk-update',
        'namespace' => 'Modules\\Settings\\Http\\Controllers',
        'prefix' => 'settings/settings',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'settings.company' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'settings/settings/company',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
        ),
        'uses' => 'Modules\\Settings\\Http\\Controllers\\CompanySettingsController@index',
        'controller' => 'Modules\\Settings\\Http\\Controllers\\CompanySettingsController@index',
        'as' => 'settings.company',
        'namespace' => 'Modules\\Settings\\Http\\Controllers',
        'prefix' => 'settings/settings',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'settings.company.update' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'settings/settings/company',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
        ),
        'uses' => 'Modules\\Settings\\Http\\Controllers\\CompanySettingsController@update',
        'controller' => 'Modules\\Settings\\Http\\Controllers\\CompanySettingsController@update',
        'as' => 'settings.company.update',
        'namespace' => 'Modules\\Settings\\Http\\Controllers',
        'prefix' => 'settings/settings',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'settings.company.logo' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'settings/settings/company/logo',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
        ),
        'uses' => 'Modules\\Settings\\Http\\Controllers\\CompanySettingsController@updateLogo',
        'controller' => 'Modules\\Settings\\Http\\Controllers\\CompanySettingsController@updateLogo',
        'as' => 'settings.company.logo',
        'namespace' => 'Modules\\Settings\\Http\\Controllers',
        'prefix' => 'settings/settings',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'settings.company.address' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'settings/settings/company/address',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
        ),
        'uses' => 'Modules\\Settings\\Http\\Controllers\\CompanySettingsController@updateAddress',
        'controller' => 'Modules\\Settings\\Http\\Controllers\\CompanySettingsController@updateAddress',
        'as' => 'settings.company.address',
        'namespace' => 'Modules\\Settings\\Http\\Controllers',
        'prefix' => 'settings/settings',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'settings.company.contact' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'settings/settings/company/contact',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
        ),
        'uses' => 'Modules\\Settings\\Http\\Controllers\\CompanySettingsController@updateContact',
        'controller' => 'Modules\\Settings\\Http\\Controllers\\CompanySettingsController@updateContact',
        'as' => 'settings.company.contact',
        'namespace' => 'Modules\\Settings\\Http\\Controllers',
        'prefix' => 'settings/settings',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'settings.profile' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'settings/settings/profile',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
        ),
        'uses' => 'Modules\\Settings\\Http\\Controllers\\ProfileController@index',
        'controller' => 'Modules\\Settings\\Http\\Controllers\\ProfileController@index',
        'as' => 'settings.profile',
        'namespace' => 'Modules\\Settings\\Http\\Controllers',
        'prefix' => 'settings/settings',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'settings.profile.update' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'settings/settings/profile',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
        ),
        'uses' => 'Modules\\Settings\\Http\\Controllers\\ProfileController@update',
        'controller' => 'Modules\\Settings\\Http\\Controllers\\ProfileController@update',
        'as' => 'settings.profile.update',
        'namespace' => 'Modules\\Settings\\Http\\Controllers',
        'prefix' => 'settings/settings',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'settings.profile.avatar' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'settings/settings/profile/avatar',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
        ),
        'uses' => 'Modules\\Settings\\Http\\Controllers\\ProfileController@updateAvatar',
        'controller' => 'Modules\\Settings\\Http\\Controllers\\ProfileController@updateAvatar',
        'as' => 'settings.profile.avatar',
        'namespace' => 'Modules\\Settings\\Http\\Controllers',
        'prefix' => 'settings/settings',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'settings.password' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'settings/settings/password',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
        ),
        'uses' => 'Modules\\Settings\\Http\\Controllers\\PasswordController@index',
        'controller' => 'Modules\\Settings\\Http\\Controllers\\PasswordController@index',
        'as' => 'settings.password',
        'namespace' => 'Modules\\Settings\\Http\\Controllers',
        'prefix' => 'settings/settings',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'settings.password.update' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'settings/settings/password',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
        ),
        'uses' => 'Modules\\Settings\\Http\\Controllers\\PasswordController@update',
        'controller' => 'Modules\\Settings\\Http\\Controllers\\PasswordController@update',
        'as' => 'settings.password.update',
        'namespace' => 'Modules\\Settings\\Http\\Controllers',
        'prefix' => 'settings/settings',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'settings.admin.dashboard' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'settings/settings/admin',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
          4 => 'can:manage system settings',
        ),
        'uses' => 'Modules\\Settings\\Http\\Controllers\\SettingController@adminDashboard',
        'controller' => 'Modules\\Settings\\Http\\Controllers\\SettingController@adminDashboard',
        'as' => 'settings.admin.dashboard',
        'namespace' => 'Modules\\Settings\\Http\\Controllers',
        'prefix' => 'settings/settings/admin',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'settings.admin.system' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'settings/settings/admin/system',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
          4 => 'can:manage system settings',
        ),
        'uses' => 'Modules\\Settings\\Http\\Controllers\\SettingController@systemSettings',
        'controller' => 'Modules\\Settings\\Http\\Controllers\\SettingController@systemSettings',
        'as' => 'settings.admin.system',
        'namespace' => 'Modules\\Settings\\Http\\Controllers',
        'prefix' => 'settings/settings/admin',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'settings.admin.system.update' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'settings/settings/admin/system',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
          4 => 'can:manage system settings',
        ),
        'uses' => 'Modules\\Settings\\Http\\Controllers\\SettingController@updateSystemSettings',
        'controller' => 'Modules\\Settings\\Http\\Controllers\\SettingController@updateSystemSettings',
        'as' => 'settings.admin.system.update',
        'namespace' => 'Modules\\Settings\\Http\\Controllers',
        'prefix' => 'settings/settings/admin',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'settings.admin.backup' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'settings/settings/admin/backup',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
          4 => 'can:manage system settings',
        ),
        'uses' => 'Modules\\Settings\\Http\\Controllers\\SettingController@backupSettings',
        'controller' => 'Modules\\Settings\\Http\\Controllers\\SettingController@backupSettings',
        'as' => 'settings.admin.backup',
        'namespace' => 'Modules\\Settings\\Http\\Controllers',
        'prefix' => 'settings/settings/admin',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'settings.admin.backup.update' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'settings/settings/admin/backup',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'web',
          2 => 'auth',
          3 => 'verified',
          4 => 'can:manage system settings',
        ),
        'uses' => 'Modules\\Settings\\Http\\Controllers\\SettingController@updateBackupSettings',
        'controller' => 'Modules\\Settings\\Http\\Controllers\\SettingController@updateBackupSettings',
        'as' => 'settings.admin.backup.update',
        'namespace' => 'Modules\\Settings\\Http\\Controllers',
        'prefix' => 'settings/settings/admin',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::W6IJj39GitjcxR1F' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/hr/timesheets/weekly-timesheets',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\WeeklyTimesheetController@index',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\WeeklyTimesheetController@index',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'api/hr/timesheets',
        'where' => 
        array (
        ),
        'as' => 'generated::W6IJj39GitjcxR1F',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::AqKpW7Ef5euR37KB' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/hr/timesheets/weekly-timesheets/current',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\WeeklyTimesheetController@current',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\WeeklyTimesheetController@current',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'api/hr/timesheets',
        'where' => 
        array (
        ),
        'as' => 'generated::AqKpW7Ef5euR37KB',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::LVUXC2iUwbs3rItP' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/hr/timesheets/weekly-timesheets/{id}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\WeeklyTimesheetController@show',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\WeeklyTimesheetController@show',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'api/hr/timesheets',
        'where' => 
        array (
        ),
        'as' => 'generated::LVUXC2iUwbs3rItP',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::quAWeZjxkUAp7wJ3' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/hr/timesheets/weekly-timesheets',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\WeeklyTimesheetController@store',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\WeeklyTimesheetController@store',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'api/hr/timesheets',
        'where' => 
        array (
        ),
        'as' => 'generated::quAWeZjxkUAp7wJ3',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::SvzUeYrQjUYbsB2Q' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'api/hr/timesheets/weekly-timesheets/{id}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\WeeklyTimesheetController@update',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\WeeklyTimesheetController@update',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'api/hr/timesheets',
        'where' => 
        array (
        ),
        'as' => 'generated::SvzUeYrQjUYbsB2Q',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::DHT7WT5iFuTb7ton' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/hr/timesheets/weekly-timesheets/{id}/submit',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\WeeklyTimesheetController@submit',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\WeeklyTimesheetController@submit',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'api/hr/timesheets',
        'where' => 
        array (
        ),
        'as' => 'generated::DHT7WT5iFuTb7ton',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::FJsKuJYbPIGXKs2f' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/hr/timesheets/time-entries',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimeEntryController@index',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimeEntryController@index',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'api/hr/timesheets',
        'where' => 
        array (
        ),
        'as' => 'generated::FJsKuJYbPIGXKs2f',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::RRzLQDdgtedRyMY1' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/hr/timesheets/time-entries',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimeEntryController@store',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimeEntryController@store',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'api/hr/timesheets',
        'where' => 
        array (
        ),
        'as' => 'generated::RRzLQDdgtedRyMY1',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::2yWYnM4C89l2dXWt' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/hr/timesheets/time-entries/{id}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimeEntryController@show',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimeEntryController@show',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'api/hr/timesheets',
        'where' => 
        array (
        ),
        'as' => 'generated::2yWYnM4C89l2dXWt',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::mvoKVwJmMdMuWlKE' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'api/hr/timesheets/time-entries/{id}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimeEntryController@update',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimeEntryController@update',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'api/hr/timesheets',
        'where' => 
        array (
        ),
        'as' => 'generated::mvoKVwJmMdMuWlKE',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::Z2Eu4BXWTgbstl0F' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'api/hr/timesheets/time-entries/{id}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimeEntryController@destroy',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimeEntryController@destroy',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'api/hr/timesheets',
        'where' => 
        array (
        ),
        'as' => 'generated::Z2Eu4BXWTgbstl0F',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::AXOvmoUMQmN64tVc' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/hr/timesheets/time-entries/bulk',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimeEntryController@bulkStore',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimeEntryController@bulkStore',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'api/hr/timesheets',
        'where' => 
        array (
        ),
        'as' => 'generated::AXOvmoUMQmN64tVc',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::DtcFDSwO1baeKHRX' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/hr/timesheets/overtime-entries',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\OvertimeController@index',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\OvertimeController@index',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'api/hr/timesheets',
        'where' => 
        array (
        ),
        'as' => 'generated::DtcFDSwO1baeKHRX',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::HXEeEzMQtwXgJmf0' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/hr/timesheets/overtime-entries',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\OvertimeController@store',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\OvertimeController@store',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'api/hr/timesheets',
        'where' => 
        array (
        ),
        'as' => 'generated::HXEeEzMQtwXgJmf0',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::xR0a5cbQhejNV4lm' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/hr/timesheets/approvals',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimesheetApprovalController@index',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimesheetApprovalController@index',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'api/hr/timesheets',
        'where' => 
        array (
        ),
        'as' => 'generated::xR0a5cbQhejNV4lm',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::l7c7NU14hrn2daVJ' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'api/hr/timesheets/approvals/{id}/approve',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimesheetApprovalController@approve',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimesheetApprovalController@approve',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'api/hr/timesheets',
        'where' => 
        array (
        ),
        'as' => 'generated::l7c7NU14hrn2daVJ',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::E4Zocem0EiA62wO8' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'api/hr/timesheets/approvals/{id}/reject',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimesheetApprovalController@reject',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimesheetApprovalController@reject',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'api/hr/timesheets',
        'where' => 
        array (
        ),
        'as' => 'generated::E4Zocem0EiA62wO8',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::wFEd4gu4zIQcgqym' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/hr/timesheets/reports/summary',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimesheetReportController@summary',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimesheetReportController@summary',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'api/hr/timesheets',
        'where' => 
        array (
        ),
        'as' => 'generated::wFEd4gu4zIQcgqym',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::qwpmO74DGVl6zqj5' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'api/hr/timesheets/reports/generate',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimesheetReportController@generate',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimesheetReportController@generate',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'api/hr/timesheets',
        'where' => 
        array (
        ),
        'as' => 'generated::qwpmO74DGVl6zqj5',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::vHZLmCBx7TNT8pGP' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/hr/timesheets/calendar',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimesheetCalendarController@index',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimesheetCalendarController@index',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'api/hr/timesheets',
        'where' => 
        array (
        ),
        'as' => 'generated::vHZLmCBx7TNT8pGP',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::H9cakbEbEsh8xOQc' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/hr/timesheets/calendar/{year}/{month}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimesheetCalendarController@month',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimesheetCalendarController@month',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'api/hr/timesheets',
        'where' => 
        array (
        ),
        'as' => 'generated::H9cakbEbEsh8xOQc',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::ggAyMVJSI7VOpHHB' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/hr/timesheets/projects',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimesheetProjectController@index',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimesheetProjectController@index',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'api/hr/timesheets',
        'where' => 
        array (
        ),
        'as' => 'generated::ggAyMVJSI7VOpHHB',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::t3BsyuWA5SpDfelR' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/hr/timesheets/tasks',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimesheetTaskController@index',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimesheetTaskController@index',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'api/hr/timesheets',
        'where' => 
        array (
        ),
        'as' => 'generated::t3BsyuWA5SpDfelR',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'generated::bfHEuwGGTCfLySP5' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'api/hr/timesheets/projects/{projectId}/tasks',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'api',
          1 => 'auth:sanctum',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimesheetTaskController@tasksForProject',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\Api\\TimesheetTaskController@tasksForProject',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'api/hr/timesheets',
        'where' => 
        array (
        ),
        'as' => 'generated::bfHEuwGGTCfLySP5',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/timesheets/hr/timesheets',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@index',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@index',
        'as' => 'timesheets.index',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.dashboard' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/dashboard',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetDashboardController@index',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetDashboardController@index',
        'as' => 'timesheets.dashboard',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@create',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@create',
        'as' => 'timesheets.create',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'hr/timesheets/hr/timesheets',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@store',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@store',
        'as' => 'timesheets.store',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/{timesheet}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@show',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@show',
        'as' => 'timesheets.show',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.edit' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/{timesheet}/edit',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@edit',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@edit',
        'as' => 'timesheets.edit',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/{timesheet}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@update',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@update',
        'as' => 'timesheets.update',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/{timesheet}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@destroy',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@destroy',
        'as' => 'timesheets.destroy',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.submit' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/{timesheet}/submit',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@submit',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@submit',
        'as' => 'timesheets.submit',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.check-duplicate' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/check-duplicate',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@checkDuplicate',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@checkDuplicate',
        'as' => 'timesheets.check-duplicate',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.monthly' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/monthly',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@monthly',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@monthly',
        'as' => 'timesheets.monthly',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.summary' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/summary',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@summary',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@summary',
        'as' => 'timesheets.summary',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.entries.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/entries',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimeEntryController@index',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimeEntryController@index',
        'as' => 'timesheets.entries.index',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.entries.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/entries/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimeEntryController@create',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimeEntryController@create',
        'as' => 'timesheets.entries.create',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.entries.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/entries',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimeEntryController@store',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimeEntryController@store',
        'as' => 'timesheets.entries.store',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.entries.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/entries/{entryId}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimeEntryController@show',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimeEntryController@show',
        'as' => 'timesheets.entries.show',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.entries.edit' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/entries/{entryId}/edit',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimeEntryController@edit',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimeEntryController@edit',
        'as' => 'timesheets.entries.edit',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.entries.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/entries/{entryId}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimeEntryController@update',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimeEntryController@update',
        'as' => 'timesheets.entries.update',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.entries.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/entries/{entryId}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimeEntryController@destroy',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimeEntryController@destroy',
        'as' => 'timesheets.entries.destroy',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.overtime.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/overtime',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\OvertimeController@index',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\OvertimeController@index',
        'as' => 'timesheets.overtime.index',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.overtime.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/overtime/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\OvertimeController@create',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\OvertimeController@create',
        'as' => 'timesheets.overtime.create',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.overtime.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/overtime',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\OvertimeController@store',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\OvertimeController@store',
        'as' => 'timesheets.overtime.store',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.approvals.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/approvals',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetApprovalController@index',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetApprovalController@index',
        'as' => 'timesheets.approvals.index',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.approvals.approve' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/approvals/{timesheetId}/approve',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetApprovalController@approve',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetApprovalController@approve',
        'as' => 'timesheets.approvals.approve',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.approvals.reject' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/approvals/{timesheetId}/reject',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetApprovalController@reject',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetApprovalController@reject',
        'as' => 'timesheets.approvals.reject',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.reports.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/reports',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetReportController@index',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetReportController@index',
        'as' => 'timesheets.reports.index',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.reports.generate' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/reports/generate',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetReportController@generate',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetReportController@generate',
        'as' => 'timesheets.reports.generate',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.reports.export' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/reports/export',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetReportController@export',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetReportController@export',
        'as' => 'timesheets.reports.export',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.reports.monthly' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/reports/monthly',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetReportController@monthlyReport',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetReportController@monthlyReport',
        'as' => 'timesheets.reports.monthly',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.reports.payslip' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/reports/payslip/{employeeId}/{month}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetReportController@generatePaySlip',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetReportController@generatePaySlip',
        'as' => 'timesheets.reports.payslip',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.projects.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/projects',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetProjectController@index',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetProjectController@index',
        'as' => 'timesheets.projects.index',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.settings.edit' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/settings',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'can:manage-timesheet-settings',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetSettingController@edit',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetSettingController@edit',
        'as' => 'timesheets.settings.edit',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.settings.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/settings',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'can:manage-timesheet-settings',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetSettingController@update',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetSettingController@update',
        'as' => 'timesheets.settings.update',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.monthly-report' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/monthly-report',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'permission:timesheets.view',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@monthlyReport',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@monthlyReport',
        'as' => 'timesheets.monthly-report',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.pay-slip' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/pay-slip/{employee}/{month}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'permission:timesheets.view',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@generatePaySlip',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@generatePaySlip',
        'as' => 'timesheets.pay-slip',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.html-pay-slip' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/html-pay-slip/{employee}/{month}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'permission:timesheets.view',
        ),
        'uses' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@generateHtmlPaySlip',
        'controller' => 'Modules\\TimesheetManagement\\Http\\Controllers\\TimesheetController@generateHtmlPaySlip',
        'as' => 'timesheets.html-pay-slip',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.pay-slip-test' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/pay-slip-test/{employee?}/{month?}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'permission:timesheets.view',
        ),
        'uses' => 'O:55:"Laravel\\SerializableClosure\\UnsignedSerializableClosure":1:{s:12:"serializable";O:46:"Laravel\\SerializableClosure\\Serializers\\Native":5:{s:3:"use";a:0:{}s:8:"function";s:219:"function($employee = null, $month = null) {
            return \\Inertia\\Inertia::render(\'Timesheets/PaySlipTest\', [
                \'employeeId\' => $employee,
                \'month\' => $month,
            ]);
        }";s:5:"scope";s:37:"Illuminate\\Routing\\RouteFileRegistrar";s:4:"this";N;s:4:"self";s:32:"0000000000000cca0000000000000000";}}',
        'as' => 'timesheets.pay-slip-test',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'timesheets.direct-pay-slip' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'hr/timesheets/hr/timesheets/direct-pay-slip/{employee}/{month}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
          3 => 'permission:timesheets.view',
        ),
        'uses' => 'O:55:"Laravel\\SerializableClosure\\UnsignedSerializableClosure":1:{s:12:"serializable";O:46:"Laravel\\SerializableClosure\\Serializers\\Native":5:{s:3:"use";a:0:{}s:8:"function";s:2991:"function($employee, $month) {
            // Get the employee
            $employee = \\Modules\\EmployeeManagement\\Domain\\Models\\Employee::select([
                \'id\', \'first_name\', \'last_name\', \'employee_id\', \'position\'
            ])->findOrFail($employee);

            // Parse the month
            list($year, $monthNum) = \\explode(\'-\', $month);
            $startDate = "{$year}-{$monthNum}-01";
            $endDate = \\date(\'Y-m-t\', \\strtotime($startDate));
            $monthName = \\date(\'F\', \\strtotime($startDate));

            // Get timesheets
            $timesheets = \\Modules\\TimesheetManagement\\Domain\\Models\\Timesheet::where(\'employee_id\', $employee->id)
                ->whereBetween(\'date\', [$startDate, $endDate])
                ->orderBy(\'date\')
                ->get();

            // Calculate totals
            $totalRegularHours = $timesheets->sum(\'hours_worked\');
            $totalOvertimeHours = $timesheets->sum(\'overtime_hours\');
            $totalHours = $totalRegularHours + $totalOvertimeHours;
            $daysWorked = $timesheets->count();

            // Create calendar data
            $calendar = [];
            foreach ($timesheets as $timesheet) {
                $date = $timesheet->date;
                $dayOfWeek = \\date(\'w\', \\strtotime($date));
                $dayName = \\date(\'D\', \\strtotime($date));

                $calendar[(string)$date] = [
                    \'date\' => $date,
                    \'day_of_week\' => (string)$dayOfWeek,
                    \'day_name\' => $dayName,
                    \'regular_hours\' => $timesheet->hours_worked,
                    \'overtime_hours\' => $timesheet->overtime_hours,
                ];
            }

            // Fill in missing days
            $currentDate = new \\DateTime($startDate);
            $lastDate = new \\DateTime($endDate);

            while ($currentDate <= $lastDate) {
                $dateString = $currentDate->format(\'Y-m-d\');
                if (!isset($calendar[$dateString])) {
                    $calendar[$dateString] = [
                        \'date\' => $dateString,
                        \'day_of_week\' => (string)$currentDate->format(\'w\'),
                        \'day_name\' => $currentDate->format(\'D\'),
                        \'regular_hours\' => 0,
                        \'overtime_hours\' => 0,
                    ];
                }
                $currentDate->modify(\'+1 day\');
            }

            return \\Inertia\\Inertia::render(\'Timesheets/PaySlip\', [
                \'employee\' => $employee,
                \'month\' => $monthName,
                \'year\' => $year,
                \'start_date\' => $startDate,
                \'end_date\' => $endDate,
                \'total_regular_hours\' => $totalRegularHours,
                \'total_overtime_hours\' => $totalOvertimeHours,
                \'total_hours\' => $totalHours,
                \'days_worked\' => $daysWorked,
                \'calendar\' => $calendar,
            ]);
        }";s:5:"scope";s:37:"Illuminate\\Routing\\RouteFileRegistrar";s:4:"this";N;s:4:"self";s:32:"0000000000000ccc0000000000000000";}}',
        'as' => 'timesheets.direct-pay-slip',
        'namespace' => 'Modules\\TimesheetManagement\\Http\\Controllers',
        'prefix' => 'hr/timesheets/hr/timesheets',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'customers.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'customers',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@index',
        'controller' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@index',
        'as' => 'customers.index',
        'namespace' => NULL,
        'prefix' => 'customers',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'customers.create' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'customers/create',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@create',
        'controller' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@create',
        'as' => 'customers.create',
        'namespace' => NULL,
        'prefix' => 'customers',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'customers.store' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'customers',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@store',
        'controller' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@store',
        'as' => 'customers.store',
        'namespace' => NULL,
        'prefix' => 'customers',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'customers.show' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'customers/{customer}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@show',
        'controller' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@show',
        'as' => 'customers.show',
        'namespace' => NULL,
        'prefix' => 'customers',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'customers.edit' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'customers/{customer}/edit',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@edit',
        'controller' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@edit',
        'as' => 'customers.edit',
        'namespace' => NULL,
        'prefix' => 'customers',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'customers.update' => 
    array (
      'methods' => 
      array (
        0 => 'PUT',
      ),
      'uri' => 'customers/{customer}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@update',
        'controller' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@update',
        'as' => 'customers.update',
        'namespace' => NULL,
        'prefix' => 'customers',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'customers.destroy' => 
    array (
      'methods' => 
      array (
        0 => 'DELETE',
      ),
      'uri' => 'customers/{customer}',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@destroy',
        'controller' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@destroy',
        'as' => 'customers.destroy',
        'namespace' => NULL,
        'prefix' => 'customers',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'customers.report' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'customers/report',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@report',
        'controller' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@report',
        'as' => 'customers.report',
        'namespace' => NULL,
        'prefix' => 'customers',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'customers.export' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'customers/export',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@export',
        'controller' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@export',
        'as' => 'customers.export',
        'namespace' => NULL,
        'prefix' => 'customers',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'customers.import' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'customers/import',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@importForm',
        'controller' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@importForm',
        'as' => 'customers.import',
        'namespace' => NULL,
        'prefix' => 'customers',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'customers.process-import' => 
    array (
      'methods' => 
      array (
        0 => 'POST',
      ),
      'uri' => 'customers/import',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@processImport',
        'controller' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@processImport',
        'as' => 'customers.process-import',
        'namespace' => NULL,
        'prefix' => 'customers',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'customers.invoices' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'customers/{customer}/invoices',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@invoices',
        'controller' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@invoices',
        'as' => 'customers.invoices',
        'namespace' => NULL,
        'prefix' => 'customers',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'customers.rentals' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'customers/{customer}/rentals',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@rentals',
        'controller' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@rentals',
        'as' => 'customers.rentals',
        'namespace' => NULL,
        'prefix' => 'customers',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'customers.quotations' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'customers/{customer}/quotations',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@quotations',
        'controller' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@quotations',
        'as' => 'customers.quotations',
        'namespace' => NULL,
        'prefix' => 'customers',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'customers.payments' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'customers/{customer}/payments',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
        ),
        'uses' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@payments',
        'controller' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerController@payments',
        'as' => 'customers.payments',
        'namespace' => NULL,
        'prefix' => 'customers',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'customer-portal.index' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'customer-portal',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerPortalController@index',
        'controller' => 'Modules\\CustomerManagement\\Http\\Controllers\\CustomerPortalController@index',
        'as' => 'customer-portal.index',
        'namespace' => NULL,
        'prefix' => 'customer-portal',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'customer-portal.dashboard' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'customer-portal/dashboard',
      'action' => 
      array (
        'middleware' => 
        array (
          0 => 'web',
          1 => 'auth',
          2 => 'verified',
        ),
        'uses' => 'Modules\\CustomerManagement\\Http\\Controllers\\DashboardController@index',
        'controller' => 'Modules\\CustomerManagement\\Http\\Controllers\\DashboardController@index',
        'as' => 'customer-portal.dashboard',
        'namespace' => NULL,
        'prefix' => 'customer-portal',
        'where' => 
        array (
        ),
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
    'storage.local' => 
    array (
      'methods' => 
      array (
        0 => 'GET',
        1 => 'HEAD',
      ),
      'uri' => 'storage/{path}',
      'action' => 
      array (
        'uses' => 'O:55:"Laravel\\SerializableClosure\\UnsignedSerializableClosure":1:{s:12:"serializable";O:46:"Laravel\\SerializableClosure\\Serializers\\Native":5:{s:3:"use";a:3:{s:4:"disk";s:5:"local";s:6:"config";a:5:{s:6:"driver";s:5:"local";s:4:"root";s:59:"D:\\Apps\\snd_rentalreact_app\\New_snd_app\\storage\\app/private";s:5:"serve";b:1;s:5:"throw";b:0;s:6:"report";b:0;}s:12:"isProduction";b:0;}s:8:"function";s:323:"function (\\Illuminate\\Http\\Request $request, string $path) use ($disk, $config, $isProduction) {
                    return (new \\Illuminate\\Filesystem\\ServeFile(
                        $disk,
                        $config,
                        $isProduction
                    ))($request, $path);
                }";s:5:"scope";s:47:"Illuminate\\Filesystem\\FilesystemServiceProvider";s:4:"this";N;s:4:"self";s:32:"0000000000000ced0000000000000000";}}',
        'as' => 'storage.local',
      ),
      'fallback' => false,
      'defaults' => 
      array (
      ),
      'wheres' => 
      array (
        'path' => '.*',
      ),
      'bindingFields' => 
      array (
      ),
      'lockSeconds' => NULL,
      'waitSeconds' => NULL,
      'withTrashed' => false,
    ),
  ),
)
);
