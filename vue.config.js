const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          quietDeps: true, // Suprime las advertencias detalladas de obsolescencia
        },
      },
    },
  },
})
