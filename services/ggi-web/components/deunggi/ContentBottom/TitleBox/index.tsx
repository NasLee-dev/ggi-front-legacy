'use client'

import DefaultButton from '@/components/commons/buttons/DefaultButton'
import * as S from './style'
import { useState } from 'react'
import ModalPortal from '@/components/commons/modals/ModalPortal'
import BasketModal from '@/components/deunggi/modal/BasketModal'
import { useDeunggiStore } from '@/store/useDeunggiStore'
import { Flex } from 'styles/sharedStyle'

const BUTTON_TEXT = {
  delete: '삭제하기',
  checkout: '결제하기',
  basket: '장바구니',
}

const MODES = {
  REGISTRATION: '등기발행',
  BASKET: '장바구니',
  MANAGEMENT: '등기관리',
}

export default function TitleBox() {
  const { mode, setMode } = useDeunggiStore()
  const [isOpenFirstModal, setIsOpenFirstModal] = useState(false)
  const [isOpenSecondModal, setIsOpenSecondModal] = useState(false)

  const handleClickBasket = () => setIsOpenFirstModal(true)
  const handleCloseFirstModal = () => setIsOpenFirstModal(false)
  const handleCloseSecondModal = () => setIsOpenSecondModal(false)

  const handleClickBasketConfirm = () => {
    handleCloseFirstModal()
    alert('장바구니 담기 로직')
    setIsOpenSecondModal(true)
  }

  const locationBasket = () => {
    setMode('장바구니')
    handleCloseSecondModal()
  }

  const renderButtons = () => {
    switch (mode) {
      case MODES.REGISTRATION:
        return (
          <DefaultButton
            text={BUTTON_TEXT.basket}
            onClick={handleClickBasket}
          />
        )
      case MODES.BASKET:
        return (
          <Flex gap={15}>
            <DefaultButton
              backColor="#4B5563"
              text={BUTTON_TEXT.delete}
              onClick={() => {}}
            />
            <DefaultButton text={BUTTON_TEXT.checkout} onClick={() => {}} />
          </Flex>
        )
      case MODES.MANAGEMENT:
        return (
          <DefaultButton
            backColor="#4B5563"
            text={BUTTON_TEXT.delete}
            onClick={() => {}}
          />
        )
      default:
        return null
    }
  }

  return (
    <S.TitleContainer>
      <S.SearchResultTitle>
        {mode === MODES.REGISTRATION
          ? '검색결과'
          : mode === MODES.BASKET
            ? '장바구니'
            : '열람내역'}
      </S.SearchResultTitle>
      {renderButtons()}
      <ModalPortal isOpen={isOpenFirstModal} onClose={handleCloseFirstModal}>
        <BasketModal
          text={
            <div>
              선택한 등기 <span style={{ color: '#2563EB' }}>2</span>건을
              <br />
              장바구니에 넣으시겠습니까?
            </div>
          }
          onClick={handleClickBasketConfirm}
          onClose={handleCloseFirstModal}
          type="basket"
        />
      </ModalPortal>
      <ModalPortal isOpen={isOpenSecondModal} onClose={handleCloseSecondModal}>
        <BasketModal
          text={
            <div>
              장바구니에 저장이 완료되었습니다. <br />
              장바구니로 이동하겠습니까?
            </div>
          }
          onClick={locationBasket}
          onClose={handleCloseSecondModal}
          type="complete"
        />
      </ModalPortal>
    </S.TitleContainer>
  )
}
