![](https://imgkr2.cn-bj.ufileos.com/69667a7f-7b10-46ae-9c44-69e032e135f6.png?UCloudPublicKey=TOKEN_8d8b72be-579a-4e83-bfd0-5f6ce1546f13&Signature=uvpiLu%252B7osc3CJt1PhbhCc%252BqMfs%253D&Expires=1599828802)


华为2020开发者大会在9月10号如约而至

从2019年大会鸿蒙发布后，很多人的目光都聚焦在了鸿蒙OS的开源计划上，“PPT系统”的声音不绝于耳

今天发布会之前，吃瓜的我无意间在gitee上看到了这个横幅👇，我知道，终于它来了

![](https://imgkr2.cn-bj.ufileos.com/b9f1cce8-55fc-4579-b98d-de3b60cba525.png?UCloudPublicKey=TOKEN_8d8b72be-579a-4e83-bfd0-5f6ce1546f13&Signature=VYkXdUtzac%252Ffx8GZuM%252FDWJVcSwE%253D&Expires=1599829267)

截至到我发稿前，开源仓库已经有了2k+ star

![](https://imgkr2.cn-bj.ufileos.com/b699843b-87a4-471b-ab6e-9702f2d6cd51.png?UCloudPublicKey=TOKEN_8d8b72be-579a-4e83-bfd0-5f6ce1546f13&Signature=zju66bkvro0eyC2vnQs4xWfQY50%253D&Expires=1599829453)

并且提供了看起来比较完善的中文文档

![](https://imgkr2.cn-bj.ufileos.com/ebd48fcb-068e-4baf-a276-470487ca2aa6.png?UCloudPublicKey=TOKEN_8d8b72be-579a-4e83-bfd0-5f6ce1546f13&Signature=s2kNwSNplpyI3qgtVKdpnWwdI3k%253D&Expires=1599829650)

同时发布了一款配套的IDE「DevEco Studio」，注册开发者即可下载

![](https://imgkr2.cn-bj.ufileos.com/5dc7f27e-4086-4c3f-8aef-e160a841e5d4.png?UCloudPublicKey=TOKEN_8d8b72be-579a-4e83-bfd0-5f6ce1546f13&Signature=lCrNY6b0rJPbrfo10kZR4CXMTYU%253D&Expires=1599829792)


### 前端er上手体验

作为一个前端技术人，比较令我兴奋的是，鸿蒙OS有一套基于**前端技术栈**的UI开发框架

![](https://imgkr2.cn-bj.ufileos.com/7bbbdd03-0c99-4e65-b0c7-06ab893a14a5.png?UCloudPublicKey=TOKEN_8d8b72be-579a-4e83-bfd0-5f6ce1546f13&Signature=zxDWe%252FGyF5Hm4K6cIKinMVjFItI%253D&Expires=1599830984)


于是我上手体验了一下，下面简单介绍一下步骤。


安装IDE之后，创建项目，这里我选择了一个TV设备的项目模板

![](https://imgkr2.cn-bj.ufileos.com/4cc5e478-b021-46d1-aa35-bea974709e2f.png?UCloudPublicKey=TOKEN_8d8b72be-579a-4e83-bfd0-5f6ce1546f13&Signature=8TAv%252FojAJA6GOmBfFZ0QCgZ8Xkk%253D&Expires=1599830082)

做一些简单的配置

![](https://imgkr2.cn-bj.ufileos.com/0d0501a9-2cba-4da2-83d4-439e82d254fd.png?UCloudPublicKey=TOKEN_8d8b72be-579a-4e83-bfd0-5f6ce1546f13&Signature=Rb%252BL3iMUJq0PXqg9T0y%252F47UZDCA%253D&Expires=1599830126)

然后会自动打包构建出一个demo项目，并且在IDE内提供了远程模拟设备

![](https://imgkr2.cn-bj.ufileos.com/22128678-b18c-4cae-9760-20647afaeb11.png?UCloudPublicKey=TOKEN_8d8b72be-579a-4e83-bfd0-5f6ce1546f13&Signature=M3ubohSlMtUW%252FrU%252FOk4U1NQRmE8%253D&Expires=1599830340)

选取合适的模拟设备后，就可以运行项目了，得到的效果是这样的

![](https://imgkr2.cn-bj.ufileos.com/8d1d4b68-ab27-4a27-b383-6514b85d2b85.png?UCloudPublicKey=TOKEN_8d8b72be-579a-4e83-bfd0-5f6ce1546f13&Signature=eRaAtyT3Xk3lJRMP6UxSLtD883E%253D&Expires=1599830559)

### 代码

效果图这样的一个电视页面，用到了 **hml+css+js** 三部分代码

hml：

```html
<div class="container">
    <div class="tv_box">
        <div class="title_box">
            <text class="title">{{title}}</text>
            <text class="title">酥鱼TVtest</text>
            <button type="circle" icon="{{icon_src}}" class="setting_box" onfocus="iconFocusFunc"
                    onblur="iconBlurFunc"></button>
        </div>
        <tabs class="tab_box">
            <tab-bar mode="scrollable" class="bar_box">
                <block for="[1,2,3,4,5,6,7,8,9]">
                    <text class="tab_text">{{$t('strings.tab')}}
                    </text>
                </block>
            </tab-bar>
            <tab-content>
                <block for="[1,2,3,4,5,6,7,8,9]">
                    <div class="content_box">
                        <list class="content_img">
                            <block for="[1,2,3,4]">
                                <list-item type="listItem" class="list_img">
                                    <image focusable="true" class="tab_img" src="/common/img-large.png"></image>
                                </list-item>
                            </block>
                        </list>
                        ...
                    </div>
                </block>
            </tab-content>
        </tabs>
    </div>
</div>

```


js:
```javascript
import app from '@system.app';
export default {
    data: {
        title: "",
        subtitle: "",
        icon_src: "/common/plus.png",
        appName: app.getInfo().appName
    },
    onInit() {
        this.title = this.appName;
        this.subtitle = this.$t('strings.subtitle');
    },
    iconFocusFunc: function () {
        this.icon_src = "/common/plus-black.png";
    },
    iconBlurFunc: function () {
        this.icon_src = "/common/plus-white.png";
    }
}
```

css:
```css
.container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #000000;
}

.title_box {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 60px;
}

.title {
    font-size: 36px;
    color: rgba(255, 255, 255, 0.9);
    margin-left: 48px;
}
...

```

### 总结

整体体验下来，感觉开发过程还是很丝滑的，api和开发模式很有vue的味道，应该存在借鉴。对于vue技术栈的前端er来说应该很好上手

![](https://imgkr2.cn-bj.ufileos.com/29e1acda-4037-47e6-b7bc-aed542d971dd.png?UCloudPublicKey=TOKEN_8d8b72be-579a-4e83-bfd0-5f6ce1546f13&Signature=pwGf2vKOXp2rEvYVWAWUX%252FXehw0%253D&Expires=1599830729)

自从去年的贸易战到后来的疫情，国际局势日趋复杂，鸿蒙OS的开源，对于国家和国内技术行业都有非凡的意义


单从前端行业的角度来看，鸿蒙OS的发布，给前端技术人提供了web之外，扩展向物联网行业的，更广的发挥空间和更多的应用场景


值得前端技术人向国内鸿蒙开源社区，提供更多的关注，注入更多的技术力量

