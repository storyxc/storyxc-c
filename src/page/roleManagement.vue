<template>
  <div id="app">
    <div class="content-header">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item>系统设置</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="app-container">
      <div class="box">
        <div class="filter-container">
          <el-input
            placeholder="名称/关键字/描述"
            v-model="pagination.queryString"
            style="width: 200px;"
            class="filter-item"
            clearable
            @clear="findPage()"
            @keyup.enter.native="findPage('search')"
          ></el-input>
          <el-button @click="findPage('search')" class="dalfBut">查询</el-button>
          <el-button type="primary" class="butT" @click="handleCreate()">新建</el-button>
        </div>
        <el-table size="small" current-row-key="id" :data="dataList" stripe highlight-current-row>
          <el-table-column type="index" align="center" label="序号"></el-table-column>
          <el-table-column prop="name" label="角色名称" align="center"></el-table-column>
          <el-table-column prop="keyword" label="角色关键字" align="center"></el-table-column>
          <el-table-column prop="description" label="角色描述" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
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
        <!-- 添加标签弹层 -->
        <div class="add-form">
          <el-dialog
            title="新增角色"
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
                        <el-form-item label="角色名称" prop="name">
                          <el-input v-model="formData.name" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="角色关键字" prop="keyword">
                          <el-input v-model="formData.keyword" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="角色描述">
                          <el-input v-model="formData.description" type="textarea"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="权限信息" name="second">
                  <div class="checkScrol">
                    <table class="datatable">
                      <thead>
                        <tr>
                          <th>选择</th>
                          <th>权限名称</th>
                          <th>权限关键字</th>
                          <th>权限说明</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(p,i) in permission_tableData" :key="i">
                          <td>
                            <input :id="p.id" v-model="permissionIds" type="checkbox" :value="p.id" />
                          </td>
                          <td>
                            <label :for="p.id">{{p.name}}</label>
                          </td>
                          <td>
                            <label :for="p.id">{{p.keyword}}</label>
                          </td>
                          <td>
                            <label :for="p.id">{{p.description}}</label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="菜单信息" name="menu">
                  <div class="checkScrol">
                    <div class="datatable">
                      <el-tree
                        :props="defaultProps"
                        :data="menu_tableData"
                        :default-checked-keys="menuIds"
                        node-key="id"
                        show-checkbox
                        ref="add_tree"
                        @check="getCheckedKeys('add_tree')"
                        default-expand-all
                      ></el-tree>
                    </div>
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

        <!-- 编辑标签弹层 -->
        <div class="add-form">
          <el-dialog
            title="编辑角色"
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
                        <el-form-item label="角色名称" prop="name">
                          <el-input v-model="formData.name" />
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="角色关键字" prop="keyword">
                          <el-input v-model="formData.keyword" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="角色描述">
                          <el-input v-model="formData.description" type="textarea"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="权限信息" name="second">
                  <div class="checkScrol">
                    <table class="datatable">
                      <thead>
                        <tr>
                          <th>选择</th>
                          <th>权限名称</th>
                          <th>权限关键字</th>
                          <th>权限说明</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(p,i) in permission_tableData" :key="i">
                          <td>
                            <input :id="p.id" v-model="permissionIds" type="checkbox" :value="p.id" />
                          </td>
                          <td>
                            <label :for="p.id">{{p.name}}</label>
                          </td>
                          <td>
                            <label :for="p.id">{{p.keyword}}</label>
                          </td>
                          <td>
                            <label :for="p.id">{{p.description}}</label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="菜单信息" name="menu">
                  <div class="checkScrol">
                    <div class="datatable">
                      <el-tree
                        :props="defaultProps"
                        :data="menu_tableData"
                        :default-checked-keys="menuIds"
                        node-key="id"
                        show-checkbox
                        ref="edit_tree"
                        @check-change="getCheckedKeys('edit_tree')"
                        default-expand-all
                      ></el-tree>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </template>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible4Edit=false">取消</el-button>
              <el-button type="primary" @click="handleUpdate()">确定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "roleManagement",
  data() {
    return {
      dialogAutoExit: false, //弹窗不自动关闭
      default_expand_all: true,
      pagination: {
        //分页数据模型
        currentPage: 1, //当前页码
        pageSize: 10, //每页显示的记录数
        total: 0, //总记录数
        queryString: null //查询条件
      },
      defaultProps: {
        label: "name",
        children: "children"
      },
      dataList: [], //当前页要展示的分页列表数据
      formData: {}, //表单数据
      permission_tableData: [], //添加/修改窗口中权限列表数据
      menu_tableData: [], ///添加/修改窗口中的菜单列表数据
      permissionIds: [], ///添加/修改窗口中权限复选框对应id (已选中的)
      menuIds: [], //添加/修改窗口中菜单复选框对应id (已选中的)
      menuIds_up: [], //添加/修改窗口中菜单复选框对应id (将要上传的)
      activeName: "first", //添加/编辑窗口Tab标签名称
      dialogFormVisible: false, //增加表单是否可见，即是否弹出添加窗口
      dialogFormVisible4Edit: false, //修改表单是否可见，即是否弹出修改窗口
      rules: {
        //校验规则
        name: [
          { required: true, message: "角色名称为必填项", trigger: "blur" }
        ],
        keyword: [
          { required: true, message: "关键字为必填项", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.findPage();
  },
  methods: {
    getCheckedKeys(name) {
      var addMenuObjs = this.$refs[name].getCheckedNodes();
      if (addMenuObjs.length === 0) {
        this.menuIds_up = [];
        return;
      }
      var menuIds_set = new Set();
      for (var menu_item of addMenuObjs) {
        //如果有父菜单,也添加进去
        if (menu_item.parentMenuId) {
          menuIds_set.add(menu_item.parentMenuId);
        }
        // 存入选中的菜单
        menuIds_set.add(menu_item.id);
      }
      // menuIds_up 变量为要上传的菜单集合数据
      this.menuIds_up = Array.from(menuIds_set);
    },
    findPage() {
      this.$axios.post("/story/role/findPage", this.pagination).then(res => {
        this.dataList = res.data.data.list;
        this.pagination.total = res.data.data.total;
      });
    },
    // 删除
    handleDelete(row) {
      this.$confirm("此操作将永久【删除】该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.delete("/story/role", row.id).then(res => {
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
          // 取消时调用
        });
    },
    // 弹出添加窗口
    handleCreate() {
      //弹出添加窗口将表单数据清空
      this.resetForm();
      this.dialogFormVisible = true;
      try {
        //将表单验证结果清空
        this.$refs["dataAddForm"].clearValidate();
      } catch (e) {}
      //获得添加权限页面的所有权限集合
      this.$axios
        .get("/story/permission/all")
        .then(res => {
          if (res.data.flag) {
            this.permission_tableData = res.data.data;
          }
        })
        .catch(res => {
          this.$message.error("获取权限列表失败");
        });
      //获得所有菜单集合
      this.$axios
        .get("/story/menu/all")
        .then(res => {
          if (res.data.flag) {
            this.menu_tableData = res.data.data;
          }
        })
        .catch(res => {
          this.$message.error("获取菜单列表失败");
        });
    },
    // 添加
    handleAdd() {
      // 表单校验
      this.$refs["dataAddForm"].validate(valid => {
        // 所有验证通过后才会为true,只要有一个失败就是false
        if (valid) {
          var RoleObjData = this.formData; //组装一个角色对象放入基本信息
          RoleObjData.permissionNums = this.permissionIds; //对象中放入权限集合
          RoleObjData.menuNums = this.menuIds_up; //对象中放入菜单集合
          this.$axios
            .post("/story/role", RoleObjData)
            .then(res => {
              if (res.data.flag) {
                this.$message.success(res.data.message);
                this.findPage();
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch(res => {
              this.$message.error(res.data.message);
            });
          this.dialogFormVisible = false;
        } else {
          // console.log('error submit!!');
          // 中止form表单的提交
          return false;
        }
      });
    },
    // 删除
    handleDelete(row) {
      //alert(JSON.stringify(row));
      this.$confirm("此操作将永久【删除】该项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.delete("/story/role?id=" + row.id).then(res => {
            this.$message({
              message: res.data.message,
              type: res.data.flag ? "success" : "error"
            });
            // 如果成功
            if (res.data.flag) {
              // 刷新列表
              this.findPage();
            }
          });
        })
        .catch(() => {
          // 取消时调用
        });
    },
    // 弹出修改窗口, 回显数据
    handleEdit(row) {
      this.resetForm();
      var id = row.id;
      this.dialogFormVisible4Edit = true; // 弹出编辑窗口
      try {
        //将表单验证结果清空
        this.$refs["dataEditForm"].clearValidate();
      } catch (e) {}

      //获取角色信息
      this.$axios
        .get("/story/role/getRole", {
          params: {
            id: row.id
          }
        })
        .then(res => {
          if (res.data.flag) {
            this.formData = res.data.data;
            var permissionsObjList = res.data.data.permissions;
            for (var item of permissionsObjList) {
              // 存入选中的权限列表
              this.permissionIds.push(item.id);
            }
            //选中的菜单(不包括父菜单)
            var catch_menu = [];
            //全部菜单(包括父菜单)
            var all_menu = [];
            var MenueObjList = res.data.data.menus;
            for (var item of MenueObjList) {
              //将父菜单取消,不能选中,如果选中了父菜单,将会把子菜单全选中
              if (item.parentMenuId) {
                // 存入角色对应的菜单
                catch_menu.push(item.id);
              }
              all_menu.push(item.id);
            }
            this.menuIds = catch_menu;
            this.menuIds_up = all_menu;

            //获得所有权限集合
            this.$axios
              .get("/story/permission/all")
              .then(res => {
                if (res.data.flag) {
                  this.permission_tableData = res.data.data;
                } else {
                  // 失败就提示
                  this.$message({
                    message: res.data.message,
                    type: "error"
                  });
                }
              })
              .catch(res => {
                // 失败就提示
                this.$message({
                  message: res.data.message,
                  type: "error"
                });
              });

            //获得所有菜单集合
            this.$axios
              .get("/story/menu/all")
              .then(res => {
                if (res.data.flag) {
                  this.menu_tableData = res.data.data;
                } else {
                  this.$message.error(res.data.message);
                }
              })
              .catch(res => {
                this.$message.error(res.data.message);
              });
          }
        });
    },
    // 修改数据后提交
    handleUpdate() {
      // 表单校验
      // 提交
      // 结果处理
      this.$refs["dataEditForm"].validate(valid => {
        // 所有验证通过后才会为true,只要有一个失败就是false
        if (valid) {
          //alert('submit!');
          // 发送ajax axios 进行更新
          const RoleObj = this.formData;
          RoleObj.permissions = null; //将权限组对象清空,不需要再传送到服务端
          RoleObj.permissionNums = this.permissionIds;
          RoleObj.menuNums = this.menuIds_up;
          // return;
          this.$axios
            .put("/story/role", RoleObj)
            .then(res => {
              if (res.data.flag) {
                this.$message.success(res.data.message);
                this.findPage();
              }
            })
            .catch(res => {
              this.$message.error("更新角色信息失败");
            });
          this.dialogFormVisible4Edit = false;
        } else {
          console.log("error submit!!");
          // 中止form表单的提交
          return false;
        }
      });
    },
    // 重置表单
    resetForm() {
      this.formData = {}; // 清空表单数据
      this.permissionIds = [];
      this.menuIds = [];
      this.menuIds_up = [];
      this.activeName = "first";
      this.menu = {};
      this.p = {};
    },
    handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.findPage();
    },

    // 切换页码时，需要刷新列表
    handleCurrentChange(currentPage) {
      this.pagination.currentPage = currentPage;
      this.findPage();
    }
  }
};
</script>
<style lang="less" scoped>
@import "../static/css/style.css";
</style>