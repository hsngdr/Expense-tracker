import { Button, Form, Input, Modal, Select, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../store/actions/categoryActions";
import { Category, CategoryForm } from "../types/category";
import { IState } from "../store";
import { SketchPicker } from "react-color";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Mode } from "../types/general";

const emptyCategoryForm: CategoryForm = {
  name: "",
  type: "expense",
  color: "black",
};
function Categories() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("new");
  const [form, setForm] = useState<CategoryForm>(emptyCategoryForm);
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const dispatch = useDispatch<any>();

  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };

  const handleOk = () => {
    if (mode === "new") {
      dispatch(addCategory(form));
    } else if (mode === "edit" && updateId !== null) {
      dispatch(updateCategory(form, updateId));
    } else if (mode === "delete" && deleteId !== null) {
      dispatch(deleteCategory(deleteId));
    }
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyCategoryForm);
    setUpdateId(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyCategoryForm);
    setUpdateId(null);
    setDeleteId(null);
  };

  const { data, loading } = useSelector(
    (state: IState) => state.categories
  );
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text: string, category: Category) => {
        return <Tag color={category.color}>{text.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, category: Category) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => {
              showModal("edit");
              setForm(category);
              setUpdateId(category.id);
            }}
          />
          <DeleteOutlined
            onClick={() => {
              showModal("delete");
              setDeleteId(category.id);
            }}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
        >
          <Button type="primary" onClick={() => showModal("new")}>
            New Category
          </Button>
        </div>
        <Modal
          title={
            mode === "new"
              ? "New Category"
              : mode === "edit"
              ? "Edit Category"
              : mode === "delete"
              ? "Delete Category"
              : ""
          }
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: !(mode === "delete") && !form.name }}
        >
          {mode === "new" || mode === "edit" ? (
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              <Form.Item label="Category Name">
                <Input
                  name="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="Category Type">
                <Select
                  defaultValue="expense"
                  value={form.type}
                  onChange={(type: "expense" | "income") =>
                    setForm({ ...form, type })
                  }
                >
                  <Select.Option value="income">Income</Select.Option>
                  <Select.Option value="expense">Expense</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Color">
                <SketchPicker
                  color={form.color}
                  onChange={(color) => setForm({ ...form, color: color.hex })}
                />
              </Form.Item>
            </Form>
          ) : mode === "delete" ? (
            <>
              <p>Are you sure you want to delete this category?</p>
            </>
          ) : null}
        </Modal>
      </div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        rowKey="id"
      />
    </>
  );
}

export default Categories;
