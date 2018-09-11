<style lang="scss">
    /*@import "index";*/
</style>
<template>
    <div class="main layout_container">
        <div class="layout">
            <header class="layout_header">
            </header>
            <div class="layout_drawer">
                <header class="md-drawer-header">
                    <img src="https://pic7.58cdn.com.cn/nowater/fangfe/n_v295af6ac32e104321ab6a1fb81591cb32.png"
                         alt="markdown">
                </header>
                <nav class="md-navigation">
                    <div class="nav-wrap">
                        <div v-if="navs.children" :is="navs.type"
                             :navs="navs.children"
                             :nav_deep="1"
                             :active_id="active_id"
                        >
                        </div>
                        <!--添加新页面-->
                        <div v-show="is_show_create_page" class="nav-title nav-operate t1">
                            <input type="text" v-model="new_name"
                            >
                            <span class="title-save">
                                <Icon type="checkmark-round" @click.native="createPage"></Icon>
                            </span>
                            <span class="title-save-cancel">
                                <Icon type="android-close"></Icon>
                            </span>
                        </div>
                    </div>
                </nav>
                <footer v-show="true" class="md-drawer-footer">
                    <button @click="is_show_create_page=true">添加分类</button>
                </footer>
            </div>
            <main class="layout_content">
                <div class="edit-wrap">
                    <input class="title-input" type="text" v-model="name">
                    <ul class="operate-list">
                        <li @click="show_delete_dailog=true">
                            <Icon size="20" type="android-delete"></Icon>
                            <Modal
                                    v-model="show_delete_dailog"
                                    title="删除文章"
                                    @on-ok="deletepage"
                                    @on-cancel="console.log('不删除是明智的')"
                            >
                                <p>删除后整个人精神都补好了，确认删除？</p>
                            </Modal>
                        </li>
                    </ul>
                    <textarea name="" id="myarray" cols="30" rows="10" v-model="mdstr"
                              @paste="paste($event)"></textarea>
                </div>
                <div class="view-wrap">
                    <div class="code-inner">
                        <div class='md_main' v-html="htmls"></div>
                    </div>
                </div>
            </main>
        </div>
    </div>

</template>
<script>
    var remark = require('remark');
    var guide = require('remark-preset-lint-markdown-style-guide');
    var html = require('remark-html');
    var report = require('vfile-reporter');
    // 业务逻辑
    var treeData = require('./js/treeMap');
    var autoSave = require('./js/autoSave');
    var deleteBusiness = require('./js/deleteBusiness');
    var createPage = require('./js/createPage');
    var imgUpload = require('./js/imgUpload');
    var insertAtCaret = require('./js/insertAtCaret');
    export default{
        data: function () {
            return {
                _id: "",
                mdstr: "",
                name: "",
                htmls: "",
                navs: treeData["navs"],
                map: treeData["map"],
                active_id: window.active_id || "root",// 当前活动id，
                show_delete_dailog: false,
                is_show_create_page: false,
                new_name: "",// 根页面页面名
            }
        },
        created: function () {
            var _id = this.get_idByHash();
            if (!!_id) {
                this.changePage(_id);
            }
            autoSave(this);
        },
        props: {},
        methods: {
            createHtml(){
                var str = `# ${this.name}\r\n` + (this.mdstr || "");
                var _this = this;
                remark().use(guide)
                    .use(html)
                    .process(str, function (err, file) {
                        _this.htmls = String(file);
                    });
            },
            save(istip = true){
                var _this = this;
                $.ajax({
                    url: "update",
                    type: "POST",
                    data: {doc: _this.mdstr, _id: _this._id, name: _this.name},
                    dataType: "json",
                    error: function () {
                        alert(1);
                    },
                    success: function (ret) {
                        _this.map[_this._id].name = _this.name;
                        if (ret["code"] == 0) {
                            istip && _this.$Message.success('保存成功');
                        } else {
                            istip && _this.$Message.error('保存失败 code:' + ret.code);
                        }
                    }
                })
            },
            deletepage(){
                deleteBusiness(this._id, this);
            },
            changePage(_id){
                var _this = this;
                $.ajax({
                    url: "info",
                    type: "GET",
                    data: {_id: _id},
                    dataType: "json",
                    error: function () {
                        alert(1);
                    },
                    success: function (ret) {
                        _this._id = _id;
                        if (ret.code == 0) {
                            var page = ret.page;
                            _this.name = page.name;
                            _this.mdstr = page.doc;
                            _this.map[_this.active_id] && (_this.map[_this.active_id].active = false);
                            _this.map[_id].active = true;
                            _this.map[_id].name = page.name;
                            _this.active_id = _id;

                        }
                    }
                })
            },
            get_idByHash(){
                var _id;
                var hash = window.location.hash;
                hash.replace(/(?:#|&)_id=(.*?)(?:&|$)/gi, function (_, __) {
                    _id = __;
                })
                return _id;
            },
            // 添加新的分类
            createPage: function () {
                var new_name = this.new_name;
                var _this = this;
                $.ajax({
                    url: "create",
                    data: ({pid: "root", name: new_name, space_id: window.space._id}),
                    type: "POST",
                    error: function () {
                    },
                    success: function (data) {
                        if (data.code == 0) {
                            window.location.href = window.location.href.replace(/_id=.*/gi, "_id=" + data._id);
                            window.location.reload();
                        } else {
                            alert(data.desc)
                        }
                    }
                })
            },
            paste: function (e) {
                var _this = this;
                var clipboard = e.clipboardData;
                console.log(clipboard)
                for (var i = 0, len = clipboard.items.length; i < len; i++) {
                    console.log('========================================')
                    if (clipboard.items[i].kind == 'file' || clipboard.items[i].type.indexOf('image') > -1) {
                        var blob = clipboard.items[i].getAsFile();
//                        var form = new FormData;
//                        form.append('avatar', imageFile);
                        if (blob !== null) {
                            var reader = new FileReader();
                            reader.onload = function (event) {
                                // event.target.result 即为图片的Base64编码字符串
                                var base64_str = event.target.result
                                //可以在这里写上传逻辑 直接将base64编码的字符串上传（可以尝试传入blob对象，看看后台程序能否解析）
//                                console.log(base64_str);
//                                $("#ghy_img")[0].src = base64_str
                                imgUpload(base64_str, function (imgpath) {
                                    console.log(imgpath);
                                    insertAtCaret($("#myarray")[0], `![](${imgpath})`);
                                    _this.mdstr=$("#myarray")[0].value
                                })
                            }
                            reader.readAsDataURL(blob);
                        }

                    }
                }
            }
        },
        mounted: function () {
            window.addEventListener("hashchange", function () {
                var _id = _this.get_idByHash();
                if (!!_id) {
                    _this.changePage(_id);
                }
            });
            var _this = this;
            remark()
                .use(guide)
                .use(html)
                .process(this.mdstr, function (err, file) {
                    _this.htmls = String(file);
                });
            function keyDown(e) {
                var currKey = 0, e = e || event || window.event;
                currKey = e.keyCode || e.which || e.charCode;
                if (currKey == 83 && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    _this.save();
                    return false;
                }
            }

            document.onkeydown = keyDown;
            // 构造map
        },
        computed: {},
        watch: {
            'mdstr': 'createHtml'
        },
        components: {},
    }
</script>