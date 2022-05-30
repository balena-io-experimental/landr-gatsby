import React, {
  useState, useCallback
} from 'react'
import styled from 'styled-components'
import {
  Box, Button
} from 'rendition'

const DesktopView = styled.aside `
  display: none;

  @media all and (min-width: ${(props) => {
    return props.theme.breakpoints[1]
  }}px) {
    display: block;
    border-right: 1px solid #dde1f0;

    flex: 0 0 250px;
    margin-right: 40px;
  }

  @media all and (min-width: ${(props) => {
    return props.theme.breakpoints[2]
  }}px) {
    flex: 0 0 300px;
    margin-right: 80px;
  }
`

const MobileView = styled.aside `
  display: block;

  @media all and (min-width: ${(props) => {
    return props.theme.breakpoints[1]
  }}px) {
    display: none;
  }
`

const StickyWrapper = styled.div `
  z-index: 2;
  position: sticky;
  top: 0;
  bottom: 0;

  overflow-y: auto;
  width: 300px;
  padding-bottom: 80px;
`

const Toggle = styled(Button) `
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 6;
`

const List = styled(Box) `
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 5;
  padding: 36px;
`

const Sidebar = ({
  children
}) => {
  const [ isOpen, setIsOpen ] = useState(false)

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen)
  }, [ isOpen ])

  return (
    <>
      <DesktopView>
        <StickyWrapper>
          <Box px={[ 1, 1, 3, 4 ]} pb={[ 1, 1, 4 ]} pt={[ 1, 1, 3 ]}>
            {children}
          </Box>
        </StickyWrapper>
      </DesktopView>

      <MobileView>
        <Toggle
          secondary
          fontSize={22}
          icon={<div>{isOpen ? '×' : '⋯'}</div>}
          onClick={handleToggle}
        />
        {isOpen && <List>{children}</List>}
      </MobileView>
    </>
  )
}

export default Sidebar
