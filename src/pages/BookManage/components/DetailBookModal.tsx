import { Form, Modal, Image } from 'antd'
import { useEffect, useState } from 'react'
import { detail } from '../../../interface'
import './DetailBookModal.css'

interface DetailBookModalProps {
  id: number
  isOpen: boolean
  handleClose: Function
}

interface BookDetail {
  id: number
  name: string
  author: string
  description: string
  cover: string
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

export function DetailBookModal(props: DetailBookModalProps) {
  const [bookDetail, setBookDetail] = useState<BookDetail | null>(null)

  async function fetchBookDetail() {
    if (!props.id) {
      return
    }
    try {
      const res = await detail(props.id)
      if (res.status === 200 || res.status === 201) {
        setBookDetail(res.data)
      }
    } catch (e: any) {
      console.error('获取图书详情失败', e)
    }
  }

  useEffect(() => {
    if (props.isOpen && props.id) {
      fetchBookDetail()
    }
  }, [props.id, props.isOpen])

  return (
    <Modal
      title='图书详情'
      open={props.isOpen}
      onCancel={() => props.handleClose()}
      footer={null}
      width={600}
    >
      {bookDetail && (
        <div className="book-detail">
          <div className="book-cover">
            <Image 
              width={200} 
              src={`http://localhost:3000/${bookDetail.cover}`} 
              alt={bookDetail.name} 
            />
          </div>
          <div className="book-info">
            <Form {...layout} colon={false}>
              <Form.Item label="图书名称">
                <div>{bookDetail.name}</div>
              </Form.Item>
              <Form.Item label="作者">
                <div>{bookDetail.author}</div>
              </Form.Item>
              <Form.Item label="描述">
                <div style={{ whiteSpace: 'pre-wrap' }}>{bookDetail.description}</div>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </Modal>
  )
}
