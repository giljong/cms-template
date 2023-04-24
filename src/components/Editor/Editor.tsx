import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as S from './style';

type Props = {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  handleImage?: () => void;
  quillRef?: any;
};

const Image = Quill.import('formats/image');
Image.className = 'img-width-100';
Quill.register(Image, true);

export function Editor({ state, setState, handleImage, quillRef }: Props) {
  // 이미지 업로드 있을 경우 사용

  const modules = {
    toolbar: {
      // 툴바에 넣을 기능들을 순서대로 나열하면 된다.
      container: [
        [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
          { align: [] },
        ],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        image: handleImage,
      },
    },
  };

  return (
    <S.EditorContainer>
      <ReactQuill
        ref={(element) => {
          if (element !== null && quillRef) {
            quillRef.current = element;
          }
        }}
        modules={modules}
        style={{
          width: '100%',
          height: '100%',
          maxHeight: '300px',
        }}
        value={state}
        onChange={setState}
      />
    </S.EditorContainer>
  );
}
