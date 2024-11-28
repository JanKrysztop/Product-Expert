export interface Product {
  id: number
  name: string
  quantity: number
}

export interface ModalProps {
  isVisible: boolean
  title: string
  initialFormData: Product | null
}
