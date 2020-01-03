<template>
  <div id="app">
    <div class="content-header">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item>系统设置</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="app-container">
      <div class="box">
        <div class="filter-container">
          <el-input
            placeholder="用户名/电话/邮箱"
            v-model="pagination.queryString"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="handleFilter"
          ></el-input>
          <el-button @click="findPage()" class="dalfBut">查询</el-button>
          <el-button type="primary" class="butT" @click="handleCreate()">新建</el-button>
        </div>
        <el-table size="small" current-row-key="id" :data="dataList" stripe highlight-current-row>
          <el-table-column type="index" align="center" label="序号"></el-table-column>
          <el-table-column prop="username" label="用户名" align="center"></el-table-column>
          <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
          <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
          <el-table-column prop="lastLogin" label="上次登录时间" align="center"></el-table-column>
          <el-table-column label="性别" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.sex == '1' ? '男' : '女'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination
            class="pagiantion"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.currentPage"
            :page-sizes="[10,20,40,60,80,100]"
            :page-size="pagination.pageSize"
            layout="total,sizes,prev, pager, next, jumper"
            :total="pagination.total"
          ></el-pagination>
        </div>
        <!-- 新增标签弹层 -->
        <div class="add-form">
          <el-dialog
            title="新增用户"
            :visible.sync="dialogFormVisible"
            :close-on-click-modal="dialogAutoExit"
          >
            <template>
              <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="基本信息" name="first">
                  <el-form
                    ref="dataAddForm"
                    :model="formData"
                    :rules="rules"
                    label-position="right"
                    label-width="100px"
                  >
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="用户名" prop="username">
                          <el-input v-model="formData.username" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="密码" prop="password">
                          <el-input type="password" v-model="formData.password" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="性别" prop="sex">
                          <el-select v-model="formData.sex">
                            <el-option label="男" value="1"></el-option>
                            <el-option label="女" value="0"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>

                      <el-col :span="12">
                        <el-form-item label="邮箱" prop="email">
                          <el-input v-model="formData.email" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="手机号">
                          <el-input v-model="formData.phone" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="用户角色信息" name="second">
                  <div class="checkScrol">
                    <table class="datatable">
                      <thead>
                        <tr>
                          <th>选择</th>
                          <th>角色ID</th>
                          <th>角色名称</th>
                          <th>角色关键字</th>
                          <th>角色说明</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(r,i) in tableData" :key="i">
                          <td>
                            <input :id="r.id" v-model="roleIds" type="checkbox" :value="r.id" />
                          </td>
                          <td>
                            <label :for="r.id">{{r.id}}</label>
                          </td>
                          <td>
                            <label :for="r.id">{{r.name}}</label>
                          </td>
                          <td>
                            <label :for="r.id">{{r.keyword}}</label>
                          </td>
                          <td>
                            <label :for="r.id">{{r.description}}</label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </template>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button type="primary" @click="handleAdd()">确定</el-button>
            </div>
          </el-dialog>
        </div>
        <!--编辑标签弹层-->
        <div class="add-form">
          <el-dialog
            title="编辑用户"
            :visible.sync="dialogFormVisible4Edit"
            :close-on-click-modal="dialogAutoExit"
          >
            <template>
              <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="基本信息" name="first">
                  <el-form
                    ref="dataEditForm"
                    :model="formData"
                    :rules="rules"
                    label-position="right"
                    label-width="100px"
                  >
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="用户名" prop="username">
                          <el-input v-model="formData.username" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="密码" prop="password">
                          <el-input type="password" v-model="formData.password" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="性别" prop="sex">
                          <el-select v-model="formData.sex">
                            <el-option label="男" value="1"></el-option>
                            <el-option label="女" value="0"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>

                      <el-col :span="12">
                        <el-form-item label="邮箱" prop="email">
                          <el-input v-model="formData.email" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="手机号">
                          <el-input v-model="formData.phone" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="用户角色信息" name="second">
                  <div class="checkScrol">
                    <table class="datatable">
                      <thead>
                        <tr>
                          <th>选择</th>
                          <th>角色ID</th>
                          <th>角色名称</th>
                          <th>角色关键字</th>
                          <th>角色说明</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(r,i) in tableData" :key="i">
                          <td>
                            <input :id="r.id" v-model="roleIds" type="checkbox" :value="r.id" />
                          </td>
                          <td>
                            <label :for="r.id">{{r.id}}</label>
                          </td>
                          <td>
                            <label :for="r.id">{{r.name}}</label>
                          </td>
                          <td>
                            <label :for="r.id">{{r.keyword}}</label>
                          </td>
                          <td>
                            <label :for="r.id">{{r.description}}</label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </template>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible4Edit = false">取消</el-button>
              <el-button type="primary" @click="handleEdit()">确定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "userManagement",
  data() {
    return {
      dialogAutoExit: false, //弹窗不自动关闭
      activeName: "first", //添加/编辑窗口Tab标签名称
      pagination: {
        //分页相关属性
        currentPage: 1,
        pageSize: 10,
        total: 0,
        queryString: null
      },
      dataList: [], //列表数据
      formData: {}, //表单数据
      tableData: [], //添加表单窗口中角色列表数据
      roleIds: [], //添加表单窗口中role复选框对应id
      dialogFormVisible: false, //控制添加窗口显示/隐藏
      dialogFormVisible4Edit: false, //控制编辑窗口显示/隐藏

      rules: {
        //表单检验
        username: [
          { required: true, message: "用户名称为必填项", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码为必填项", trigger: "blur" }
        ],
        sex: [{ required: true, message: "性别为必填项", trigger: "blur" }],
        email: [{ required: true, message: "邮箱为必填项", trigger: "blur" }]
      }
    };
  },
  created() {
      this.findPage();
  },
  methods: {
    // 弹出添加窗口
    handleCreate() {
      //弹出添加窗口将表单数据清空
      this.resetForm();
      this.dialogFormVisible = true;
      try {
        //将表单验证结果清空
        this.$refs["dataAddForm"].clearValidate();
      } catch (e) {}
      //获得所有角色信息
      this.$axios
        .get("/story/role")
        .then(res => {
          if (res.data.flag) {
            this.tableData = res.data.data;
          }
        })
        .catch(res => {});
    },
    //更新
    handleEdit() {
      this.dialogFormVisible4Edit = false;
      this.$axios
        .put("/story/user?roleIds=" + this.roleIds, this.formData)
        .then(res => {
          this.$message({
            message: res.data.message,
            type: res.data.flag ? "success" : "error"
          });
          if (res.data.flag) {
            this.findPage();
          }
        });
    },

    //编辑弹层(获取当前编辑项信息)
    handleUpdate(row) {
      this.resetForm();
      this.dialogFormVisible4Edit = true;
      this.$axios.get("/story/user?id=" + row.id).then(res => {
        if (res.data.flag) {
          this.formData = res.data.data;
          this.$axios.get("/story/role").then(res => {
            if (res.data.flag) {
              this.tableData = res.data.data;
              this.$axios
                .post("/story/user/getRoleIdsByUserId?id=" + row.id)
                .then(res => {
                  this.roleIds = res.data.data;
                });
            } else {
              this.$message({
                message: res.data.message,
                type: "error"
              });
            }
          });
        } else {
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }
      });
    },
    //删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var id = row.id;
          this.$axios.delete("/story/user?id=" + id).then(res => {
            this.$message({
              message: res.data.message,
              type: res.data.flag ? "success" : "error"
            });
            if (res.data.flag) {
              this.findPage();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //添加
    handleAdd() {
      this.$refs["dataAddForm"].validate(valid => {
        // 所有验证通过后才会为true,只要有一个失败就是false
        if (valid) {
          this.$axios
            .post("/story/user?roleIds=" + this.roleIds, this.formData)
            .then(res => {
              this.$message({
                message: res.data.message,
                type: res.data.flag ? "success" : "error"
              });
              this.findPage();
            });
          this.dialogFormVisible = false;
        } else {
          // console.log('error submit!!');
          // 中止form表单的提交
          return false;
        }
      });
    },
    findPage() {
      this.$axios.post("/story/user/findPage", this.pagination).then(res => {
        if (res.data.flag) {
          this.dataList = res.data.data.list;
          this.pagination.total = res.data.data.total;
        } else {
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }
      });
    },
    // 切换每页记录条数时，需要刷新列表
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.findPage();
    },
    // 切换页码时，需要刷新列表
    handleCurrentChange(currentPage) {
      this.pagination.currentPage = currentPage;
      this.findPage();
    },
    // 重置表单数据
    resetForm() {
      this.formData = {}; // 清空表单数据
      this.roleIds = [];
      this.tableData = []; //添加表单窗口中检查组列表数据
      this.activeName = "first";
    }
  }
};
</script>
<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.datatable {
  position: relative;
  box-sizing: border-box;
  -webkit-box-flex: 1;
  width: 100%;
  max-width: 100%;
  font-size: 14px;
  color: rgb(96, 98, 102);
  overflow: hidden;
  flex: 1 1 0%;
}

.datatable td,
.datatable th {
  padding: 12px 0;
  min-width: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
}

.el-button--mini,
.el-button--mini.is-round {
  padding: 6px 7px;
}

.el-button + .el-button {
  margin-left: 0px;
}

.content-header > .breadcrumb {
  background: transparent;
  margin-top: 0;
  margin-bottom: 5px;
  font-size: 16px;
  padding: 4px;
  width: 200px;
  top: 4px;
  left: 10px;
  border-radius: 2px;
}

.el-breadcrumb {
  font-size: 14px;
  line-height: 18px;
}
.filter-container {
  margin: 0 0 5px 0;
}
</style>