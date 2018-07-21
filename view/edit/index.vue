<style lang="scss">
    @import "index";
</style>
<template>
    <div class="main">
        <Row>
            <Col span="4">
            <div class="nav-wrap">
                <button id="save" @click="save">保存</button>
                <ul>
                    <li class="active" v-for="(component,index) in navs">
                        <span>{{component.name}}</span>
                        <div  :is="component.name"
                             :navs="component.children"
                             :_index="component.id"></div>
                    </li>
                </ul>
            </div>
            </Col>
            <Col span="10">
            <slot>
                <div class="edit-wrap">
                    <textarea name="" id="" cols="30" rows="10" v-model="mdstr"></textarea>
                </div>
            </slot>
            </Col>
            <Col span="10">
            <slot>
                <div class="view-wrap">
                    <div class="code-inner">
                        <div class='md_1' v-html="htmls"></div>
                    </div>
                </div>
            </slot>
            </Col>
        </Row>
        <!--<div class="create-folder-wrap">-->
            <!--<Form :model="formItem" :label-width="80">-->
                <!--<FormItem label="文件夹名字">-->
                    <!--<Input placeholder="Enter something..."></Input>-->
                <!--</FormItem>-->
                <!--<FormItem>-->
                    <!--<Button type="primary">Submit</Button>-->
                    <!--<Button type="ghost" style="margin-left: 8px">Cancel</Button>-->
                <!--</FormItem>-->
            <!--</Form>-->
        <!--</div>-->
    </div>
</template>
<script>
    var remark = require('remark');
    var guide = require('remark-preset-lint-markdown-style-guide');
    var html = require('remark-html');
    var report = require('vfile-reporter');

    var ghyarray = [
        {
            "_id": "root",
            "name": "page-nav",
            "children": [{
                "_id": 1,
                "parent": null,
                "name": "page-nav",
                "children": [{
                    "_id": 2,
                    "parent": 1,
                    "name": "page-nav",
                    "children": [
                        {
                            "_id": 4, "parent": 2,
                            "name": "page-nav"
                        }]
                }, {
                    "_id": 3,
                    "parent": 1,
                    "name": "page-nav",
                    "children": [{
                        "_id": 5,
                        "parent": 3,
                        "name": "page-nav",
                        "children": [{"_id": 7, "parent": 5, "name": "page-nav"}]
                    }, {"_id": 6, "parent": 3, "name": "page-nav"}]
                }]
            }]
        }
    ];

    export default{
        data: function () {
            return {
                _id: window.page._id,
                mdstr: window.page.doc || "",
                htmls: "",
                navs: ghyarray
            }
        },
        mounted: function () {

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
                            alert("保存成功")
                        } else {
                            alert("保存失败")
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