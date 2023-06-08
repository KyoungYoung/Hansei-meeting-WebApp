module.exports = {
    apps: [
        {
            name: 'express',
            script: './build/app.js',
            args: 'start -p 8000',
            autorestart: true,
            instances: 2,
            max_memory_restart: '1G',
            kill_timeout: 5000,
            listen_timeout: 20000,
            log_date_format: 'YYYY-MM-DD HH:mm Z',
            exec_mode: 'cluster',
            min_uptime: 2000,
        },
    ],
};
