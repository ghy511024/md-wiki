<style lang="scss">
@import "./index";
</style>

<template>
    <div class="main">
        <div class="edit-wrap">
            <textarea name="" id="" cols="30" rows="10" v-model="mdstr"></textarea>
        </div>
        <div class="view-wrap">
            <div class="code-inner">
                <div class='md_1' v-html="htmls"></div>
            </div>

        </div>
    </div>
</template>
<script>
    var remark = require('remark');
    var guide = require('remark-preset-lint-markdown-style-guide');
    var html = require('remark-html');
    var report = require('vfile-reporter');

    var str=`
# Print from Chrome
You can print from Chrome using your computer or mobile device. With Google Cloud Print, you can make your printers available to you and anyone you choose.
Learn more about
## Set up Google Cloud Print
* Turn on your printer.
* On your Windows or Mac computer, open Chrome.
* At the top right, click More
    `
    export default{
        data: function () {
            return {
                mdstr: str,
                htmls: ""
            }
        },
        props: {},
        methods: {
            createHtml(){
                var _this = this;
                remark()
                    .use(guide)
                    .use(html)
                    .process(this.mdstr, function (err, file) {
                        _this.htmls = String(file);
                    });

            },
            test(){

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
        },
        computed: {},
        watch: {
            'mdstr': 'createHtml'
        },
        components: {},
    }
</script>