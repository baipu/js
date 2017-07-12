# 用yenman部署项目

1. `cnpm install -g yo `用来安装yenman项目生成引擎
2. `cnpm install -g generator-gulp-angular@0.8.1`这个是angular的项目模板
3. 项目生成器依赖`cnpm install -g gulp brower `
4. yo gulp-angular:然后就是选则angualr项目的各种配置：    
	1.选择angular的版本
	2. 子模块
	3. jquery版本，兼容ie8用1.X
    4. 选择ngResource 内置的REST API访问库
    5. 路由选召
    6. css库
    7.
    8. css编译软件 
    9. js选择 
    10. 模板引擎


5.手动安装` bower install `
            `cnpm install`


# FrontJet
 用yeoman创建项目的缺点
  1. 巨大的node_module目录
  2. 中文支持不好
  3. 目录结构（bower-components）在app目录中
  4. 选项过多
  5. 自动化程度不够手动添加index.html
  6. 工具不易升级
  7. 有bug
针对以上的缺点，作者开发出自己的工具：FrontJet
cnpm install 0g fj
FrontJet
API
命令          参数              含义
fj init                          初始化，用于生成fj。config。js文件
fj.create[name]    name项目【名称】    在当前目录下创建一个name的工程
fj serve[-s][-p $port] -s是否用https方式启动
                        -p $SPORT:启动在$PORT端口    启动一个开发服务器，同时自动启动TDD模式
fj build [--ios] [--android]  编译出供发布的文件


###不常用命令
fj help
fj tdd 启动TDD模式，这种模式下所有的js文件的变更都会自动执行单元测试
fj ut 执行所有的单元测试
fj sass 
fj coffee 
fj 主动编译一次TypeScript
fj wireApp app中的文件
fj wireBower 自动注入bower中的文件
fj clean    清理。tmp目录和dist目录

1、frontJet
    mkdir dev && cd dev
    fj create BookForum
2、启动开发服务器





	
	
	
	



