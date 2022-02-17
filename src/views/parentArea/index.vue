<template>
  <main  class="flex items-center justify-center w-full" style="height:calc(100vh - 80px)">   
    <div class="pop-up bg-white rounded shadow-md relative">
         <Loading v-if="loading" style="min-height: 350px; background: white" />
         <div v-if="user && !loading" class="h-full w-full flex flex-col p-4">
             <div class="flex items-center w-full justify-center gap-4">
                <h2 class=" text-center text-2xl text-gray-600 py-2 my-1">Welcome</h2>
                <span class="neoning bg-green-300"></span>
             </div>
                <div class="w-full flex flex-col">
                <h2 class="py-1 text-xl text-gray-600">Parent name : {{user.first_name}} {{user.last_name}}</h2>
                <h2 class="py-1 text-xl text-gray-600">Children's count: {{user.students.length}}</h2>

                </div>
                <h2 class="block flex items-center py-1 text-xl text-gray-600 gap-2">
                    <span>Your kids are waiting for you </span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </span>
                </h2>
               
        </div>
        <div v-if="!user && !loading" class="w-full h-full flex flex-col">
            <header class="px-4 py-2 w-full border-b">
                <h1 class="text-xl text-center text-gray-700 w-full">Parent Area</h1>
            </header>
            <section class="w-full px-4 py-2 flex flex-col">
                <div class="my-1 w-full">
                <label class="text-sm text-gray-700" for="">RFID</label>
                <input
                    placeholder="RFID"
                    type="text"
                    v-model="form.RFID"
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
                @click="submit"
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
                submit
                </button>
            </footer>
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
            isConnected:false,
            loading: false,
            form: {
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
        this.socket.on('parentEvent',(data)=>{
            this.newParent(data)
        })
        this.socket.on('parentDone',()=>{
            this.actionDone()
        })

    },
  methods: {
    async submit() {
        this.socket.emit('parentEvent',{RFID:this.form.RFID})
        this.user = null
        this.loading = true
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