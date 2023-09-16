addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  let url = new URL(request.url);
  let targetHostname = "api.lunarclientprod.com";


  if (url.hostname === "example.com") {
    if (url.pathname === "/launcher/launch") {

      let postUrl = new URL(url);
      postUrl.hostname = targetHostname;
      postUrl.pathname = "/launcher/launch";
      postUrl.search = url.search;

      let postRequest = new Request(postUrl, {
        method: "POST",
        body: await request.text()，
        headers: request.headers
      });

      // 转发 POST 请求到目标域名
      let response = await fetch(postRequest);

      // 返回目标服务器的响应
      return response;
          } else if (url.pathname === "/game/metadata") {

      let forwardUrl = new URL(url);
      forwardUrl.hostname = targetHostname;
      forwardUrl.pathname = "/game/metadata";
      forwardUrl.search = url.search;
  
      let forwardRequest = new Request(forwardUrl, {
        method: "GET",
        headers: request.headers
      });
  
      let response = await fetch(forwardRequest);
  
      let data = await response.json();
      data.blogPosts[0].image = "https://pic.imgdb.cn/item/64d9f5961ddac507ccbecbd7.png";
      data.blogPosts[1].image = "https://pic.imgdb.cn/item/64d9f5961ddac507ccbecbd7.png";
      data.blogPosts[2].image = "https://pic.imgdb.cn/item/64d9f5961ddac507ccbecbd7.png";
      data.serverIntegration[1].modSettings.textHotKey.enabled = true;
      data.serverIntegration[1].modSettings.freelook.enabled = false;
      data.serverIntegration[1].modSettings.particleMod.properties['particleMod_footstep'] = true;
  

      return new Response(JSON.stringify(data), {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      });
  }
    else if (url.pathname === "/launcher/metadata") {

      let getUrl = new URL(url);
      getUrl.hostname = targetHostname;
      getUrl.pathname = "/launcher/metadata";
      getUrl.search = url.search;

      let getRequest = new Request(getUrl, {
        method: "GET",
        headers: request.headers
      });

      let response = await fetch(getRequest);

      // 获取目标服务器的响应数据
      let data = await response.json();
        if (data.navItems) {
          data.navItems = data.navItems.map(item => {
            if (item.name === "Home") {
              item.name = "首页";
            } else if (item.name === "Servers") {
              item.name = "市场";
            } else if (item.name === "Settings") {
              item.name = "设置";
            } else if (item.name === "About") {
              item.name = "关于";
            } else if (item.name === "Store") {
              item.name = "赞助";
              item.remote = "https://donate.lunarcn.top";
            }

            return item;
          });

          data.navItems.push({
          name: "LunarCN"
});

          // 修改 blogPosts 中的 author 和链接
          data.blogPosts = data.blogPosts.map(post => {
            post.author = "向日葵";
            post.link = "https://lunarclient.top";
            post.excerpt = "测试测试测试测试lunarclient.top";
            post.author_uuid = "a04d619a2e7541b7b5101da91ef001c4";
            post.image = "https://pic.imgdb.cn/item/64d4dd1b1ddac507cc30f3c0.webp";
            post.title = "LunarCN";
            post.author_image = null;
            return post;
          });
          data.blogPosts[0].author = "CubeWhy";
          data.blogPosts[0].link = "https://www.bilibili.com/video/BV1Ym4y1n7WS/?spm_id_from=333.999.0.0";
          data.blogPosts[0].excerpt = "支持登录曲奇账户";
          data.blogPosts[0].author_uuid = "ee0d0448641e405a96ba242c92845d85";
          data.blogPosts[0].title = "LunarLogin";
          data.blogPosts[0].image = "https://i1.hdslb.com/bfs/archive/9a74809225013712a87e4d7ec2263e889f92781e.jpg@320w_200h_1c_!web-space-upload-video.webp"
          data.blogPosts[0].button_text = "观看视频"

          data.blogPosts[1].author = "CubeWhy";
          data.blogPosts[1].link = "https://www.bilibili.com/read/cv25882554";
          data.blogPosts[1].excerpt = "[必看]关于LunarCN无法启动与被和谐";
          data.blogPosts[1].author_uuid = "ee0d0448641e405a96ba242c92845d85";
          data.blogPosts[1].title = "patched";
          data.blogPosts[1].image = "https://article.biliimg.com/bfs/article/fa7cbc7de41ce3218850ee5ffcab7346b6da2e66.jpg"
          data.blogPosts[0].button_text = "点击阅读"

          //image区域
          data.images.default.logo = "https://pic.imgdb.cn/item/64d4de1d1ddac507cc33202f.webp";
          data.images.default.background = "https://pic.imgdb.cn/item/64d78a8d1ddac507cc4941dc.png";
          data.images.christmas.logo = "https://pic.imgdb.cn/item/64d4de1d1ddac507cc33202f.webp";
          data.theme = "";

          data.updater.channel = "latest";
          data.updater.feedUrl = "http://localhost";
          



          //versions区域修改部分
          data.versions.forEach(versions => {
            if (versions.id === "1.8") { //1.8版本
              versions.name = "丰富的更新";
              versions.description = "“丰富的更新”是2014年9月2日发布的1.8版本的名称。这次更新包含了许多新功能，比如一个独特的水下地牢，新的生物，如末影螨，守卫者，远古守卫者和兔子。这次更新还包括了装甲架的引入和许多皮肤的增强，比如Alex和夹克层。";
              versions.carousel[0].title = "新的冒险体验";
              versions.carousel[1].title = "新的Alex模型";
              versions.carousel[2].title = "广泛的社区服务器";

            } else if (versions.id === "1.20") { //1.20版本
              versions.name = "《trail & Tales》更新";
              versions.description = "“Trails & Tales Update”是2023年6月7日发布的1.20版本的名称。该更新引入了各种新内容，包括:新的生物群落，结构和生物，如樱桃林生物群落，小径废墟结构，以及生物，如嗅探器和骆驼。这次更新还包括新的锻造表，允许用户自定义他们的装甲装饰!";
              versions.carousel[0].title = "新的骆驼和嗅探怪";
              versions.carousel[1].title = "新的樱花生物群落";
              versions.carousel[2].title = "新的默认皮肤";

            } else if (versions.id === "1.19"){ //1.19版本
              versions.name = "荒野更新";
              versions.description = "荒野更新（The Wild Update）是一次主要更新，于2022年6月7日发布于Java版1.19和基岩版1.19.0，其主要内容是加入深暗之域、红树林沼泽及其相关内容。该次更新由官方宣布于Minecraft Live 2021";
              versions.carousel[0].title = "新的帮助者暴徒";
              versions.carousel[1].title = "沼泽中发现的泥";
              versions.carousel[2].title = "新古城结构";

            } else if (versions.id === "1.18"){ //1.18版本
              versions.name = "洞穴与悬崖";
              versions.description = "“洞穴与悬崖：第二部分更新”是 2021 年 11 月 30 日发布的 1.18 版本的名称。此更新完成了对“第一部分”开始的主世界一代的彻底修改，拥有巨大的洞穴、更高的山脉和许多新的生物群落。这次更新还改变了世界的高度和深度，允许出现一些壮观的山脉和巨大的洞穴系统。";
              versions.carousel[0].title = "新音乐唱片《otherside》";
              versions.carousel[1].title = "增加了世界的高度和深度";
              versions.carousel[2].title = "洞穴中发现的新植物品种";
            } else if (versions.id === "1.17"){ //1.17版本
              versions.name = "洞穴与悬崖：第一部分更新";
              versions.description = "“洞穴与悬崖：第一部分更新”是 2021 年 6 月 8 日发布的 1.17 版本的名称。本次更新首先对世界生成中的山脉、洞穴、矿脉、矿井和要塞等进行了更改。它还引入了许多新的生物群系和生物。这些生物包括山羊、蝾螈和社区投票的发光乌贼！添加的生物群落包括滴石洞穴、郁郁葱葱的洞穴和六个新的子生物群落。";
              versions.carousel[0].title = "新的水下生物";
              versions.carousel[1].title = "各种新植物";

            } else if (versions.id === "1.16"){ //1.16版本
              versions.name = "下界更新";
              versions.description = "“Nether Update”是 2020 年 6 月 23 日发布的 1.16 版本的名称。此更新改变了下界的许多内容，包括新的生物群系、新的生物和生成的结构。新的生物群系包括猩红森林和扭曲森林、灵魂沙谷和玄武岩三角洲。新的生物包括猪灵、步行者、佐格林、疣猪和猪灵蛮族。";
              versions.carousel[0].title = "添加下界合金";
              versions.carousel[1].title = "名为“pigstep”的新音乐唱片";
              versions.carousel[2].title = "新的猪灵和疣猪怪生物";

            } else if (versions.id === "1.12"){
              versions.name = "色彩世界更新";
              versions.description = "“色彩世界更新”是 2017 年 6 月 7 日发布的 1.12 版本的名称。此更新包括许多新功能，例如带有增强托盘的新彩色块、鹦鹉、库存中食谱书的介绍，一种讲述人模式，可以大声说出聊天中输入的内容、新声音等等！";
              versions.carousel[0].title = "新动物 -鹦鹉";
              versions.carousel[1].title = "新的进步系统";

            } else if(versions.id === "1.7"){
              versions.name = "改变世界的更新"
              versions.description = "“改变世界的更新”是 2013 年 10 月 25 日发布的 1.7 版的名称。此更新包括许多新功能，例如新的地形生成器、许多新的生物群落和生物群落变体、新的树类型、许多新的鲜花、红沙、彩色玻璃等等！";
              versions.carousel[0].title = "经典 PvP 体验";
              versions.carousel[1].title = "新木材类型";
              versions.carousel[2].title = "新生物群系";
            }
            //修改模块介绍
            data.versions[0].subversions[0].modules[0].description = "Lunar与OptiFine。OptiFine是一个优化mod，可以让Minecraft运行得更快，看起来更好。";
            data.versions[0].subversions[0].modules[1].description = "Lunar与Forge。其中包括OptiFine, 回放 Mod, NotEnoughUpdates和Skyblock插件。";
            data.versions[1].subversions[0].modules[0].description = "Lunar与OptiFine。OptiFine是一个优化mod，可以让Minecraft运行得更快，看起来更好。";
            data.versions[1].subversions[0].modules[1].description = "Lunar 与 Fabric, Sodium 和 Iris 绑定. Sodium 和 Iris 被 Lunar 修改以获得最佳兼容性";
            data.versions[1].subversions[1].modules[0].description = "Lunar与OptiFine。OptiFine是一个优化mod，可以让Minecraft运行得更快，看起来更好。";
            data.versions[1].subversions[1].modules[1].description = "Lunar 与 Fabric, Sodium 和 Iris 绑定. Sodium 和 Iris 被 Lunar 修改以获得最佳兼容性";
            data.versions[2].subversions[0].modules[0].description = "Lunar与OptiFine。OptiFine是一个优化mod，可以让Minecraft运行得更快，看起来更好。";
            data.versions[2].subversions[0].modules[1].description = "Lunar 与 Fabric, Sodium 和 Iris 绑定. Sodium 和 Iris 被 Lunar 修改以获得最佳兼容性"
            data.versions[2].subversions[1].modules[0].description = "Lunar与OptiFine。OptiFine是一个优化mod，可以让Minecraft运行得更快，看起来更好。";
            data.versions[2].subversions[1].modules[1].description = "Lunar 与 Fabric, Sodium 和 Iris 绑定. Sodium 和 Iris 被 Lunar 修改以获得最佳兼容性";
            data.versions[2].subversions[2].modules[0].description = "Lunar与OptiFine。OptiFine是一个优化mod，可以让Minecraft运行得更快，看起来更好。";
            data.versions[2].subversions[2].modules[1].description = "Lunar 与 Fabric, Sodium 和 Iris 绑定. Sodium 和 Iris 被 Lunar 修改以获得最佳兼容性";
            data.versions[2].subversions[3].modules[0].description = "Lunar与OptiFine。OptiFine是一个优化mod，可以让Minecraft运行得更快，看起来更好。";
            data.versions[3].subversions[0].modules[0].description = "Lunar与OptiFine。OptiFine是一个优化mod，可以让Minecraft运行得更快，看起来更好。";
            data.versions[3].subversions[0].modules[1].description = "Lunar 与 Fabric, Sodium 和 Iris 绑定. Sodium 和 Iris 被 Lunar 修改以获得最佳兼容性";
            data.versions[3].subversions[1].modules[0].description = "Lunar与OptiFine。OptiFine是一个优化mod，可以让Minecraft运行得更快，看起来更好。";
            data.versions[4].subversions[0].modules[0].description = "Lunar与OptiFine。OptiFine是一个优化mod，可以让Minecraft运行得更快，看起来更好。";
            data.versions[4].subversions[0].modules[1].description = "Lunar 与 Fabric, Sodium 和 Iris 绑定. Sodium 和 Iris 被 Lunar 修改以获得最佳兼容性";
            data.versions[5].subversions[0].modules[0].description = "Lunar与OptiFine。OptiFine是一个优化mod，可以让Minecraft运行得更快，看起来更好。";
            data.versions[5].subversions[0].modules[1].description = "Lunar 与 Fabric, Sodium 和 Iris 绑定. Sodium 和 Iris 被 Lunar 修改以获得最佳兼容性";
            data.versions[6].subversions[0].modules[0].description = "Lunar与OptiFine。OptiFine是一个优化mod，可以让Minecraft运行得更快，看起来更好。";
            data.versions[6].subversions[0].modules[1].description = "Lunar 与 Fabric, Sodium 和 Iris 绑定. Sodium 和 Iris 被 Lunar 修改以获得最佳兼容性";
            data.versions[7].subversions[0].modules[0].description = "Lunar与OptiFine。OptiFine是一个优化mod，可以让Minecraft运行得更快，看起来更好。";
            

            return versions;
          });
        }

          return new Response(JSON.stringify(data), {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers
          });
        } else {

          url.hostname = targetHostname;
          let lunarRequest = new Request(url, request);
          let response = await fetch(lunarRequest);
      
          return response;
        }
      }
  
      return fetch(request);
    }
