import React, { useEffect, useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, Modal, message } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';

interface Props {
  image?: string[];
  imageUrl?: string;
  maxCount?: number;
  handleChangeFile?: (e: any) => void;
  handleDeleteFile?: (index?: number) => void;
}

export const UploadBox = ({
  image,
  imageUrl,
  maxCount = 1,
  handleChangeFile,
  handleDeleteFile,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<{
    previewImage: string;
    previewVisible: boolean;
    previewTitle: string;
    fileList: UploadFile[];
  }>({
    previewImage: '',
    previewVisible: false,
    previewTitle: '',
    fileList: [],
  });

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  function getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
    });
  }

  const handleChange = (e: any) => {
    try {
      const isLt5M = e.file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        throw Error('이미지 최대 용량은 5MB입니다.');
      }
      if (handleChangeFile) {
        handleChangeFile(e);
      }

      setState({ ...state, fileList: e.fileList });
    } catch (e: any) {
      message.error(e.message);
    }
  };

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setState({
      ...state,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  const handleCancel = () => setState({ ...state, previewVisible: false });

  const handleRemove = (_file: UploadFile<any>) => {
    const removeIndex = state.fileList.findIndex((v) => v.uid === _file.uid);
    const tempArr = state.fileList.filter((_v, i) => i !== removeIndex);

    setState({ ...state, fileList: tempArr });
    if (handleDeleteFile) {
      handleDeleteFile(removeIndex);
    }

    return false;
  };

  useEffect(() => {
    setState({
      ...state,
      fileList:
        imageUrl?.length && image?.length
          ? image.map((v, i) => ({
              uid: `${i}`,
              name: v,
              status: 'done',
              url: `${imageUrl}/${v}`,
            }))
          : [],
    });
  }, [image, imageUrl]);

  return (
    <>
      <Upload
        listType="picture-card"
        className="avatar-uploader"
        onChange={handleChange}
        onPreview={handlePreview}
        fileList={state.fileList}
        onRemove={handleRemove}
        maxCount={maxCount}
        beforeUpload={() => false}
        accept="image/*"
      >
        {uploadButton}
      </Upload>
      <Modal
        open={state.previewVisible}
        centered
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={state.previewImage} />
      </Modal>
    </>
  );
};
