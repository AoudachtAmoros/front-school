<template>
    <div class="px-1 xs:px-2  md:px-4 xl:px-6 overflow-x-hidden" style="height: calc(100vh - 80px);">
        <div class="w-full h-full flex gap-3 bg-gray-300 px-4 py-6">
            <div v-if="state==0" class="h-full w-full flex items-center justify-center">
                <div class="flex flex-col items-center">
                    <span class="neoning bg-red-300 mx-4 "></span>
                <h1 class="text-center font-bold w-full text-3xl py-3 px-2 ">Waiting for your father</h1>
                </div>
            </div>
            <div v-if="state==1 && users.length>0" class="xs:px-2 sm:px-8 md:px-8 h-full w-full justify-around flex gap-2">
                <div class="relative w-2/3 h-full flex flex-col items-center justify-center">
                    <span class="absolute top-4 left-4 z-10 neoning bg-green-300 mx-4"></span>
                    <div class="absolute top-0 left-2 right-2 bottom-0 slider-container">
                        <div v-for="(user, index) in users" :key="index" v-show="currentIndex==index" class="w-full h-full">
                                <div class="absolute bottom-2 right-2 left-2 text-center z-10 opacity-70 p-2 bg-gray-200">
                                   <span class="text-2xl z-10 text-gray-700 opacity-100 z-20 text-2xl">{{user.s_first_name}} {{user.s_last_name}}</span>
                                </div>
                                <ImageC :data="user.img" /> 
                        </div>
                    </div>
                </div>
                <div class="w-1/3 grid grid-cols-2 gap-2 oervlow-x-hidden overflow-y-auto bg-gray-400">
                    <div class="w-full flex flex-col items-center p-2" v-for="(user, index) in users" :key="index">
                            <div class="py-2">
                                    <h4 class="text-xl">{{user.s_first_name}} {{user.s_last_name}}</h4>
                                </div>
                            <div class="img-continer w-full">
                                <ImageC :data="user.img" />  
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ImageC from '../../components/ImageC.vue'
import SocketioService from '../../services/sockets.io';

export default {
  props: {
  },
    components:{
        ImageC
    },
  data () {
    return {
        state : 1,
        currentIndex:0,
        paylod:{
            parentImage:'',
            studentImage:'',
            parentNane:'',
            studentName:'',
        },
        users :[
            {
              first_name :'user 1',
              last_name :'ls',
              s_first_name :'student',
              s_last_name :'ls',
              img :  {
                        src:'data:image/jpeg;base64,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',
                        alt:'',
                    },
            },
            {
              first_name :'user 2',
              last_name :'opp',
              s_first_name :'student',
              s_last_name :'opp',
               img :  {
                    src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuB4NNDud9NhGDNksKtH-gX4mNtXm6D51EcRJBqk9lU89Hc0ycbRurFvgsziP89cwbuaA&usqp=CAU',
                    alt:'',
                },
            },
            {
              first_name :'user 3',
              last_name :'unser',
              s_first_name :'student',
              s_last_name :'unser',
               img :  {
                        src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPtP0RSMzOpYRj2AN0WHvOnoAser9Mb0yzGhKnSAADy_kjZ2I8JZ-U6hkODUsX0J6rV3k&usqp=CAU',
                        alt:'',
                    },
            },
        ]
    }
    },
    created(){
        this.socket = SocketioService.setupSocketConnection();
    },
    mounted(){
        console.log('studentArea');
        this.socket.emit('studentArea')
        this.socket.on('studentEvent',(data)=>{
            this.newstudent(data)
        })
        this.socket.on('actionDone',()=>{
            this.actionDone()
        })
        setInterval(() => {
            this.moveSlider()
        }, 5000);
    },
    methods:{
        validate(){
            this.socket.emit('studentDone')
            this.state = 0
            this.user = null
        },
        newstudent(data){
            this.state = 1
            this.users.push(data.data) 
        },
        moveSlider(){
            if (this.users.length>0) {
                if (this.currentIndex < this.users.length ) {
                    this.currentIndex +=1
                }
                if (this.currentIndex == this.users.length) {
                    this.currentIndex = 0
                }
            }
        }
    }
}
</script>
<style scoped>
.img-continer{
    height:200px;
}
.slider-container{
    /* height: ; */
}
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
</style>