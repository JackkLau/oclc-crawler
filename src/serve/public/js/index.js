import {createApp, onMounted, ref} from './vue.esm-browser.js';
import {postData} from './fetchBookList.js';

const app = createApp({
    setup() {
        const urlRef = ref();

        function submit() {
            console.log('urlRef :>>', urlRef.value);
            const params = {
                url:urlRef.value
            }
            postData('/query', params).then(data => {
                console.log('data :>>', data);
            });
        }

        onMounted(() => {

        });

        return {
            submit,
            urlRef
        };
    }
});
app.mount(document.getElementById('app'));