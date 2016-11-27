//包装函数
module.exports = function(grunt) {
	//1、任务配置（所有插件的配置信息）
	grunt.initConfig({
		//获取 package.json 的信息
		pkg: grunt.file.readJSON('package.json'),

		//uglify插件的配置信息（js压缩插件）
		uglify: {
			options: {
				stripBanners: true,
				banner: '/*! <%=pkg.name%>-<%=pkg.version%>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/test.js',
				dest: 'build/<%=pkg.name%>-<%=pkg.version%>.js.min.js'
			}
		},

		//jshint插件的配置信息（js查找错误插件）
		jshint: {
			test1: ['Gruntfile.js'],
			test2: ['src/*.js'],
			options: {
				jshintrc: '.jshintrc'

			}
		},

		// //csslint插件的配置信息（css查找错误插件）
		// csslint: {
		// 	build: ['src/*.css'],
		// 	options: {
		// 		csslintrc: '.csslintrc'
		// 	}
		// },

		// watch插件配置信息（自动化监听文件变动插件）
		watch: {
			build: {
				files: ['src/*.js', 'src/*.css'],
				tasks: ['jshint', 'uglify'],
				options: {
					spawn: false
				}
			}
		}
	});


	//2、告诉grunt我们将使用的插件（插件加载代码）
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	// grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');


	//3、告诉grunt当我们在终端中输入grunt时需要做些什么（注意先后顺序）（任务注册代码）
	grunt.registerTask('default', ['jshint', 'uglify', 'watch']);
};