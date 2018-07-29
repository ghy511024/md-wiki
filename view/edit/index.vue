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
                    <input class="title-input" type="text" v-model="name">
                    <ul class="operate-list">
                        <li @click="show_delete_dailog=true">
                            <Icon size="20" type="android-delete"></Icon>
                            <!--<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">-->
                                <!--<path d="M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4V14H12v24zM38 8h-7l-2-2H19l-2 2h-7v4h28V8z"/>-->
                            <!--</svg>-->
                            <Modal
                                    v-model="show_delete_dailog"
                                    title="删除文章"
                                    @on-ok="deletepage"
                                    @on-cancel="console.log('明智')"
                            >
                                <p>删除后电脑会在5分钟后死机，确认删除？</p>
                            </Modal>
                        </li>
                    </ul>
                    <textarea name="" id="" cols="30" rows="10" v-model="mdstr"></textarea>
                </div>
                <div class="view-wrap">
                    <div class="code-inner">
                        <div class='md_5' v-html="htmls"></div>
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
                show_delete_dailog: false
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
                    url: "/page/update",
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
                            _this.name = page.name;
                            _this.mdstr = page.doc;
                            _this.map[_this.active_id].active = false;
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