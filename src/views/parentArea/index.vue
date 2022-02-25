<template>
  <main  class="flex items-center justify-around w-full" style="height:calc(100vh - 80px)">   
    <div class="pop-up w-1/3 bg-white rounded shadow-md relative">
         <Loading v-if="loading" style="min-height: 350px; background: white" />
        <div v-if="!firstScan.state && !loading" class="w-full h-full flex flex-col">
            <header class="px-4 py-2 w-full border-b">
                <h1 class="text-xl text-center text-gray-700 w-full">First Scan</h1>
            </header>
            <section class="w-full px-4 py-2 flex flex-col">
                <div class="my-1 w-full">
                <label class="text-sm text-gray-700" for="">RFID</label>
                <input
                    placeholder="RFID"
                    type="text"
                    v-model="form1.RFID"
                    class="
                    w-full
                    rounded
                    border
                    py-2
                    px-2
                    bg-gray-50
                    text-sm
                    focus:border-2 focus:outline-none
                    "
                    :class="{'border-red-300 border-2':error}"
                />
                </div>
            </section>
            <footer
                class="px-4 py-2 w-full border-t flex items-center justify-center"
            >
                <button
                @click="submit1"
                class="
                    py-2
                    px-4
                    bg-primary
                    text-white
                    opacity-80
                    hover:opacity-100
                    rounded
                    shadow
                "
                >
                Submit
                </button>
            </footer>
        </div>
        <div v-if="firstScan.state && !loading" class="w-full h-full flex flex-col">
            <header class="px-4 py-2 w-full border-b">
                <h1 class="text-xl text-center text-gray-700 w-full">Parent Area</h1>
            </header>
            <section class="w-full px-4 py-2 flex flex-col">
                <h2 class="py-2 text-2xl text-gray-600"> sir khod wldek </h2>
            </section>
        </div>
        <div v-if="firstScan.error" class="w-full h-full flex flex-col">
            <header class="px-4 py-2 w-full border-b">
                <h1 class="text-xl text-center text-gray-700 w-full">First Scan</h1>
            </header>
            <section class="w-full px-4 py-2 flex flex-col">
                                <h2 class="py-2 text-2xl text-gray-600"> {{secondScan.error}} </h2>

            </section>
        </div>
    </div>
    <!-- second scan -->
    <div class="pop-up w-1/3 bg-white rounded shadow-md relative">
         <Loading v-if="loading" style="min-height: 350px; background: white" />
        <div v-if="!secondScan.state && !loading" class="w-full h-full flex flex-col">
            <header class="px-4 py-2 w-full border-b">
                <h1 class="text-xl text-center text-gray-700 w-full">Second Scan</h1>
            </header>
            <section class="w-full px-4 py-2 flex flex-col">
                <div class="my-1 w-full">
                <label class="text-sm text-gray-700" for="">RFID</label>
                <input
                    placeholder="RFID"
                    type="text"
                    v-model="form2.RFID"
                    class="
                    w-full
                    rounded
                    border
                    py-2
                    px-2
                    bg-gray-50
                    text-sm
                    focus:border-2 focus:outline-none
                    "
                    :class="{'border-red-300 border-2':error}"
                />
                </div>
            </section>
            <footer
                class="px-4 py-2 w-full border-t flex items-center justify-center"
            >
                <button
                @click="submit2"
                class="
                    py-2
                    px-4
                    bg-primary
                    text-white
                    opacity-80
                    hover:opacity-100
                    rounded
                    shadow
                "
                >
                Submit
                </button>
            </footer>
        </div>
        <div v-if="secondScan.state && !loading" class="w-full h-full flex flex-col">
            <header class="px-4 py-2 w-full border-b">
                <h1 class="text-xl text-center text-gray-700 w-full">Parent Area</h1>
            </header>
            <section class="w-full px-4 py-2 flex flex-col">
                <h2 class="py-2 text-2xl text-gray-600"> lah i3awnek </h2>
            </section>
        </div>
        <div v-if="secondScan.error && !loading" class="w-full h-full flex flex-col">
            <header class="px-4 py-2 w-full border-b">
                <h1 class="text-xl text-center text-gray-700 w-full">Parent Area</h1>
            </header>
            <section class="w-full px-4 py-2 flex flex-col">
                <h2 class="py-2 text-2xl text-gray-600"> {{secondScan.error}} </h2>
            </section>
        </div>
    </div>
</main>
</template>
<script>
import Loading from "../../components/loading.vue";
import SocketioService from '../../services/sockets.io';
// import axios from "axios";
export default {
    components: {
        Loading,
    },
    data() {
        return {
            loading: false,
            firstScan:{
              state : false,
              user:null,
              error:null
            },
            secondScan:{
              state : false,
              user:null,
              error:null
            },
            form1: {
                RFID: "",
            },
            form2: {
                RFID: "",
            },
            user :null,
            error: null,
            baseUrl: this.$store.state.baseUrl,
            socket : null,
            step :'waiting',
        };
    },
    created(){
        this.socket = SocketioService.setupSocketConnection();
    },
    mounted() {
        document.querySelector("body").classList.add("stop-scrolling");
        this.socket.emit('parentArea')
        this.socket.on('firstScan',(data)=>{
            this.firstScanM(data)
        })
        this.socket.on('secondScan',(data)=>{
            this.secondScanM(data)
        })
        // this.socket.on('parentDone',()=>{
        //     this.actionDone()
        // })

    },
  methods: {
    async submit1() {
        this.socket.emit('firstScan',{RFID:this.form1.RFID})
        this.firstScan.user = null
        this.loading = true
    },
    async submit2() {
        this.socket.emit('secondScan',{RFID:this.form2.RFID})
        this.secondScan.user = null
        this.loading = true
    },
    firstScanM(data){
        this.loading = false

      if(data.status==true){
        this.firstScan.state = true
        console.log(data);
        this.firstScan.user = data.response
        setTimeout(() => {
            this.firstScan.state = false
            this.firstScan.user = null
        }, 4000);
      }else{
        this.firstScan.error = data.error
        setTimeout(() => {
              this.firstScan.error = data.null
        }, 4000);
      }
    },
    secondScanM(data){
        this.loading = false
         if(data.status==true){
        this.secondScan.state = true
        console.log(data);
        this.secondScan.user = data.response
        setTimeout(() => {
            this.secondScan.state = false
            this.secondScan.user = null
        }, 4000);
      }else{
        this.secondScan.error = data.error
        setTimeout(() => {
              this.secondScan.error = data.null
        }, 4000);
      }
    },
    newParent(data){
        console.log(data);
        if (data.status == 200) {
            this.user = data.data
        }else{
            this.error = data.error
        }
        this.loading = false
    },
    actionDone(){
        this.form.RFID =''
        this.user =null
        this.error =null
    },
    close() {
      this.$emit("close");
    }
  },
  beforeDestroy() {
    document.querySelector("body").classList.remove("stop-scrolling");
  },
};
</script>
<style>
.neoning{
    height: 40px;
    width: 40px;
    border-radius:50%;
    animation: neoning-bounce 1s ease infinite;
}
@keyframes neoning-bounce {
  0% { opacity: 1 }
  25% { opacity: .5; }
  50% { opacity: 0; }
  75% { opacity: .5;}
  100% { opacity: 1;}
}
.pop-up {
  width: 35vw;
}
.rotate--90 {
  transform: rotate(-90deg);
}
.bg-primary {
  background: rgb(19, 41, 59);
}
@media (max-width: 992px) {
  .pop-up {
    width: 45vw;
  }
}
@media (max-width: 768px) {
  .pop-up {
    width: 50vw;
  }
}
@media (max-width: 640px) {
  .pop-up {
    width: 60vw;
  }
}
@media (max-width: 500px) {
  .pop-up {
    width: 70vw;
  }
}
@media (max-width: 425px) {
  .pop-up {
    width: 80vw;
  }
}
</style>