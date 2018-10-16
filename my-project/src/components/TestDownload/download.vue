<template>
    <div id="games">
        <button @click="download">下载</button>
    </div>
</template>

<script>
export default {
    name: "Games",
    methods: {
        download() {
            console.log("aaaa")

            let data = {
                name: "aaa",
                num: 12,
                list: [{
                    color: "white"
                }, {
                    color: "pink"
                }]
            }

            let blob = new Blob([JSON.stringify(data, null, 4)], { type: "json" });
            if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveBlob(blob, "kk.json");
            } else {
                let link = document.createElement("a");
                link.setAttribute("href", window.URL.createObjectURL(blob));
                link.setAttribute("download", "tt.json");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

        }
    }
};
</script>

<style>

</style>
