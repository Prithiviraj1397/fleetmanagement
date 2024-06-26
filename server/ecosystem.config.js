module.exports = {
    apps: [
        {
            name         : "NodeTemplate",
            script       : "./build/app.js",            
            ignore_watch : ["node_modules"],
            autorestart  : true,
            env: {
                NODE_ENV : "development"
            },
            env_production: {
                NODE_ENV : "production"
            },
            env_staging : {
                NODE_ENV: "staging"
            },
        }
    ]
}
