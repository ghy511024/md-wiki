<style lang="scss">
    @import "index";
</style>
<template>
    <div class="main">
        <div class="nav-wrap">
            <div v-if="navs.children" :is="navs.type"
                 :navs="navs.children"
            >
            </div>
        </div>
        <div class="inner">
            <div class="edit-wrap">
                <input class="title-input" type="text" :value="title">
                <ul class="operate-list">
                    <li><Icon size="20" type="android-delete"></Icon></li>
                </ul>
                <textarea name="" id="" cols="30" rows="10" v-model="mdstr"></textarea>
            </div>
            <div class="view-wrap">
                <div class="code-inner">
                    <div class='md_1' v-html="htmls"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    var remark = require('remark');
    var guide = require('remark-preset-lint-markdown-style-guide');
    var html = require('remark-html');
    var report = require('vfile-reporter');
    export default{
        data: function () {
            return {
                _id: window.page._id,
                mdstr: window.page.doc || "",
                title: window.page.title || window.page.name,
                htmls: "",
                navs: window.navs,
                map: {}
            }
        },
        mounted: function () {
            var _map = {}
            for (var i = 0; i < this.navs.length; i++) {
                _map[this.navs[i]._id] = Object.assign({
                    active: false,
                    isadd: false,
                    value: "",
                }, this.navs[i]);
            }
            this.map = _map;
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
            }
        },
        mounted: function () {
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
        },
        computed: {},
        watch: {
            'mdstr': 'createHtml'
        },
        components: {},
    }
</script>