import { getAuth } from "app/bid-form/remote/getAuth";
import { getIdcodeCheck } from "app/bid-form/remote/getIdcodeCheck";
import { getMstSeqInfo } from "app/bid-form/remote/getInfo";
import { biddingInfoState, stepState } from "@/store/atom/bid-form";
import { useMutation } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

export default function useGetAuth( token: string | null, idcode?: string | null, mstSeq?: string | null) {
  const [stateNum, setStateNum] = useRecoilState(stepState)
  const [biddingForm, setBiddingForm] = useRecoilState(biddingInfoState)

  const handleStateNum = () => {
    if (biddingForm.state === 0) {
      setStateNum(2)
    } else if (
      (biddingForm.state === 1 || biddingForm.state === 2) &&
      biddingForm.agentYn === 'Y'
    ) {
      if (biddingForm.agent.name === '') {
        setStateNum(5)
      }
      setStateNum(17)
    } else if (
      (biddingForm.state === 1 || biddingForm.state === 2) &&
      biddingForm.agentYn !== 'Y'
    ) {
      setStateNum(6)
    } else if (biddingForm.state >= 4 && biddingForm.agentYn === 'Y') {
      if (biddingForm.agent.name === '') {
        setStateNum(5)
      } else {
        setStateNum(17)
      }
    } else if (biddingForm.state >= 4 && biddingForm.agentYn !== 'Y') {
      if (biddingForm.bidders?.length === 0) {
        setStateNum(7)
      } else {
        setStateNum(16)
      }
    } else if (biddingForm.state === 9) {
      setStateNum(0)
    }
  }
  return useMutation({
    mutationKey: ['getAuth'],
    mutationFn: () => getAuth(token),
    onSuccess: async (data) => {
      if (data?.data.success) {
        if (window) {
          window.history.pushState({}, '', '/bid-form')
        }
        if (idcode) {
          const idcodeResponse = await getIdcodeCheck(idcode as string)
          setBiddingForm((prev) => ({
            ...prev,
            ...idcodeResponse,
          }))
        }
        if (mstSeq) {
          const mstSeqResponse = await getMstSeqInfo(mstSeq as string)
          setBiddingForm((prev) => ({
            ...prev,
            ...mstSeqResponse,
            biddingDateString : mstSeqResponse.biddingDateString ?? mstSeqResponse.biddingDate.substring(0, 4) + '년 ' +  mstSeqResponse.biddingDate.substring(5, 6) + '월 ' + mstSeqResponse.biddingDate.substring(7, 8) + '일',
          }))
          handleStateNum()
        }
      }
    }
  })
}