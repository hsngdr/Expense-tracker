import { IState } from "../store";
import { Button, Form, Input, Modal, Select, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../store/actions/categoryActions";
import { Category } from "../types/category";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Record, RecordForm } from "../types/record";
import {
  addRecord,
  deleteRecord,
  getRecords,
  updateRecord,
} from "../store/actions/recordActions";
import { Mode } from "../types/general";

const emptyRecordForm: RecordForm = {
  title: "",
  amount: 0,
  category_id: 0,
};
function Records() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("new");
  const [form, setForm] = useState<RecordForm>(emptyRecordForm);
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: recordData, loading } = useSelector(
    (state: IState) => state.records
  );
  const { data: categoriesData } = useSelector(
    (state: IState) => state.categories
  );
  const dispatch = useDispatch<any>();

  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };

  const handleOk = () => {
    if (mode === "new") {
      dispatch(addRecord(form));
    } else if (mode === "edit" && updateId !== null) {
      dispatch(updateRecord(form, updateId));
    } else if (mode === "delete" && deleteId !== null) {
      dispatch(deleteRecord(deleteId));
    }
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyRecordForm);
    setUpdateId(null);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyRecordForm);
    setUpdateId(null);
    setDeleteId(null);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: Record["amount"], record: Record) => {
        return (
          <>
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(amount)}
          </>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: Record["category"], record: Record) => {
        return <Tag color={category.color}>{category.name.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Last Update",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: string, record: Record) => {
        return <>{new Date(updatedAt).toLocaleDateString()}</>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: Record) => {
        const { title, amount } = record;
        const category_id = record.category.id;
        return (
          <Space size="middle">
            <EditOutlined
              onClick={() => {
                showModal("edit");
                setForm({ title, amount, category_id });
                setUpdateId(record.id);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                showModal("delete");
                setDeleteId(record.id);
              }}
            />
          </Space>
        );
      },
    },
  ];
  useEffect(() => {
    dispatch(getRecords());
    !categoriesData.length && dispatch(getCategories());
  }, []);

  const isFormValid = !(
    !form.title ||
    form.amount === 0 ||
    form.category_id === 0
  );
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
          <Button
            type="primary"
            onClick={() => {
              showModal("new");
            }}
          >
            New Record
          </Button>
        </div>
        <Modal
          title={
            mode === "new"
              ? "New Record"
              : mode === "edit"
              ? "Edit Record"
              : mode === "delete"
              ? "Delete Record"
              : ""
          }
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: !(mode === "delete") && !isFormValid }}
        >
          {mode === "new" || mode === "edit" ? (
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              <Form.Item label="Title">
                <Input
                  name="Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="Amount">
                <Input
                  name="amount"
                  value={form.amount}
                  onChange={(e) =>
                    setForm({ ...form, amount: Number(e.target.value) })
                  }
                />
              </Form.Item>
              <Form.Item label="Category">
                <Select
                  defaultValue={form.category_id}
                  value={form.category_id}
                  onChange={(value) => setForm({ ...form, category_id: value })}
                >
                  <Select.Option value={0} disabled>
                    Select Category
                  </Select.Option>
                  {categoriesData.map((category: Category) => (
                    <Select.Option key={category.id} value={category.id}>
                      {category.name}
                    </Select.Option>
                  ))}
                </Select>
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
        dataSource={recordData}
        rowKey="id"
      />
    </>
  );
}

export default Records;
