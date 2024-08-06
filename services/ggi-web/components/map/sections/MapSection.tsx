/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from 'react'
import { NaverMap } from '@/models/Map'
import useMap from './hooks/useMap'
import useMapUtils from './hooks/useMapUtils'
import GGIMap from './GGIMap'

const isHalfWindow = () => window.innerWidth < 768

export default function MapSection() {
  const [openCursor, setOpenCursor] = useState<boolean>(false)
  const markerClickedRef = useRef<boolean>(false)
  const [halfDimensions, setHalfDimensions] = useState({
    width: 0,
    height: 0,
  })
  const [range, setRange] = useState<number>(0)
  const dragStateRef = useRef(false)
  const {
    mapCount,
    setMapCount,
    openOverlay,
    setOpenOverlay,
    isOpen,
    setIsOpen,
    clickedMapType,
    setClickedMapType,
  } = useMapUtils()

  const { initMap } = useMap()

  const onLoadMap = (map: NaverMap) => {
    initMap(map)
  }

  return (
    <>
      <GGIMap
        onLoad={onLoadMap}
        zoom={16}
        clickedMapType={clickedMapType}
        setMapCount={setMapCount}
        markerClickedRef={markerClickedRef}
        setOpenOverlay={setOpenOverlay}
        setClickedMapType={setClickedMapType}
        setHalfDimensions={setHalfDimensions}
        dragStateRef={dragStateRef}
        openCursor={openCursor}
        setOpenCursor={setOpenCursor}
      />
      {/* <BoxGuard isOpen={isOpen}>
        <SearchBox setOpenOverlay={setOpenOverlay} />
        <ListBox
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          dragStateRef={dragStateRef}
          setOpenOverlay={setOpenOverlay}
        />
      </BoxGuard>
      <Flex
        direction="column"
        style={{
          display: isHalfWindow() ? 'none' : 'flex',
        }}
      >
        <TopBar openCursor={openCursor}>
          <AddressContainer
            openCursor={openCursor}
            setOpenCursor={setOpenCursor}
            range={range}
            setRange={setRange}
            setOpenOverlay={setOpenOverlay}
          />
        </TopBar>
        {openCursor && (
          <BottomAddress
            range={range}
            setRange={setRange}
            setOpenCursor={setOpenCursor}
          />
        )}
      </Flex>
      <Markers
        openOverlay={openOverlay}
        setOpenOverlay={setOpenOverlay}
        markerClickedRef={markerClickedRef}
      />
      <Clusterings item={mapCount} />
      {openOverlay && <Overlay halfDimensions={halfDimensions} />} */}
    </>
  )
}
