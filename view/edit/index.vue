<style lang="scss">
    @import "index";
</style>
<template>
    <div class="main layout_container">
        <div class="layout">
            <header class="layout_header">

            </header>
            <div class="layout_drawer">
                <header class="md-drawer-header"></header>
                <nav class="md-navigation">
                    <div class="nav-wrap">
                        <div v-if="navs.children" :is="navs.type"
                             :navs="navs.children"
                             :nav_deep="1"
                             :active_id="active_id"
                        >
                        </div>
                    </div>
                </nav>
            </div>
            <main class="layout_content">
                <div class="edit-wrap">
                    <input class="title-input" type="text" :value="title">
                    <ul class="operate-list">
                        <li>
                            <Icon size="20" type="android-delete"></Icon>
                        </li>
                    </ul>
                    <textarea name="" id="" cols="30" rows="10" v-model="mdstr"></textarea>
                </div>
                <div class="view-wrap">
                    <div class="code-inner">
                        <div class='md_1' v-html="htmls"></div>
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
    var treeData = require('./js/treeData');
    console.log(treeData["navs"], "sssssss");
    export default{
        data: function () {
            return {
                _id: "",
                mdstr: "",
                title: "",
                htmls: "",
                navs: treeData["navs"],
                map: treeData["map"],
                active_id: window.active_id || "root",// 当前活动id
            }
        },
        created: function () {
            var _id = this.get_idByHash();
            if (!!_id) {
                this.changePage(_id);
            }
        },
        props: {},
        methods: {
            createHtml(){
                var _this = this;
                remark().use(guide)
                    .use(html)
                    .process(this.mdstr, function (err, file) {
                        _this.htmls = String(file);
                    });

            },
            save(){
                var _this = this;
                $.ajax({
                    url: "/page/update",
                    type: "POST",
                    data: {doc: _this.mdstr, _id: window.page._id},
                    dataType: "json",
                    error: function () {
                        alert(1);
                    },
                    success: function (ret) {
                        if (ret["code"] == 0) {
                            _this.$Message.success('保存成功');
                        } else {
                            _this.$Message.error('保存失败 code:' + data.code);
                        }
                    }
                })
            },
            changePage(_id){
                var _this = this;
                console.log("开始请求")
                $.ajax({
                    url: "/page/info",
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
                            _this.title = page.title || page.name;
                            _this.mdstr = page.doc;
                            _this.map[_this.active_id].active = false;
                            _this.map[_id].active = true;
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