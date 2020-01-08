<template>
    
    <div>
        <el-button  type="button"  size="small" @click="toAddHandler" >
            添加
        </el-button>
        <el-button type="danger" size="small">
            批量删除
        </el-button>
       
        <el-table :data="product">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="name" label="产品名称"></el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
            <el-table-column prop="description" label="描述"></el-table-column>
            <el-table-column prop="categoryId" label="所属产品"></el-table-column>
            <el-table-column prop="photo" width="300px" label="照片"></el-table-column>

            <el-table-column label="操作">
               <template v-slot="slot">
                   <a href="" @click.prevent="toDeleteHandler(slot.row.id)">删除</a>
                   <a href="" @click.prevent="toUpdateHandler(slot.row)">修改</a>
                    <a href="" @click.prevent="">详情</a>
               </template>
            </el-table-column>
            
        </el-table>
        <el-pagination
    layout="prev, pager, next"
    :total="50">
  </el-pagination>
        <el-dialog
                :title="title"
                :visible.sync="visible"
                width="60%" >
                {{form}}
                <el-form :model="form" label-width="80px">
                     <el-form-item label="名称">
                        <el-input  v-model="form.name">

                        </el-input>
                    </el-form-item>

                
                    <el-form-item label="价格">
                        <el-input  v-model="form.price">

                        </el-input>
                    </el-form-item>
                    <el-form-item label="所属栏目">
                    <el-select v-model="form.status" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.name"
                        :value="item.parentId">
                        </el-option>
                    </el-select>
                    </el-form-item>

                <el-form-item label="介绍">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="form.description">
                    </el-input>

                </el-form-item>


                <el-form-item label="上传图片">
                    <el-upload
                            class="upload-demo"
                            action="http://localhost:6677/file/upload"
                            multiple
                            :limit="3"
                            
                            :file-list="fileList"
                            :on-success="upLoadSucessHandler">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="closeModalHandler" size="small">取 消</el-button>
                    <el-button type="primary" @click="submitHandler" size="small">确 定</el-button>

                </span>
            </el-dialog>
    </div>
</template>

<script>
import request from '@/utils/request'
import querystring from 'querystring'
export default {
    methods:{
        loadData(){
            let url="http://localhost:6677/product/findAll"
        request.get(url).then((response)=>{
            //this指向外部函数的this
            this.product=response.data;
        })
        },
         loadData2(){
            let url="http://localhost:6677/category/findAll"
        request.get(url).then((response)=>{
            //this指向外部函数的this
            this.options=response.data;
        })
        },
         toAddHandler(){
            let url = "http://localhost:6677/category/findAll"
            request.get(url).then((response)=>{
                this.options = response.data;
            })
            this.form={
                type:"product"
            }
            this.fileList=null;
            this.title="添加产品信息",
            this.visible=true;
            
        },
        closeModalHandler(){
            this.visible=false;
        },
          toUpdateHandler(row){
            let url = "http://localhost:6677/category/findAll"
            request.get(url).then((response)=>{
                this.options = response.data;
            })
            this.fileList=null;
            this.title="修改产品信息",
             this.form=row;
            this.visible=true;
        },
        upLoadSucessHandler(response){
            let photo="http://localhost:8888/group1/"+response.data.id
            this.form.photo=photo;
            console.log(response);
        },
        submitHandler(){
                //与后台进行交互
                let url="http://localhost:6677/product/saveOrUpdate";
                // request.post(url,this.form)
                request({
                    //小括号方法调用
                    url,
                    method:"Post",
                    headers:{
                        //查询字符串 type=customer&age=12
                        //通过request与后台交互
                        "Content-Type":"application/x-www-form-urlencoded"
                    },
                    data:querystring.stringify(this.form)
                }).then((response)=>{

                    this.closeModalHandler();
                    this.loadData();
                    this.$message({
                        type:"success",
                        message:response.message
                    })
                })
        },
        
        toDeleteHandler(id){
             this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //调用后台接口，实现删除
            let url="http://localhost:6677/product/deleteById?id="+id;
            request.get(url).then((response)=>{
                //刷新页面
                this.loadData();
                //提示信息
                this.$message({
   
                    type: 'success',
                    message: '删除成功!'+id
                });
            })
        })
        }
    },
    data(){
        //用于存放要向网页中显示的数据
        return{
            visible:false,
            title:"录入栏目信息",
            product:[
             
            ],
            fileList:[],
           
            options:[],
            form:{
                type:"product"
            }
          
        }
    },
    created(){
        this.loadData();
    }
}
</script>
<style scoped>

</style>