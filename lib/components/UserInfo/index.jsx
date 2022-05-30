/*
 * Copyright 2019 balena.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react'
import {
  Box, Container, Divider, Flex, Heading, Img, Txt
} from 'rendition'
import styled from 'styled-components'
import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome'
import {
  faUserCircle
} from '@fortawesome/free-solid-svg-icons/faUserCircle'
import {
  faLightbulb
} from '@fortawesome/free-solid-svg-icons/faLightbulb'
import {
  faAt
} from '@fortawesome/free-solid-svg-icons/faAt'
import {
  faStar
} from '@fortawesome/free-solid-svg-icons/faStar'
import {
  faFlagCheckered
} from '@fortawesome/free-solid-svg-icons/faFlagCheckered'
import {
  faFootballBall
} from '@fortawesome/free-solid-svg-icons/faFootballBall'
import {
  BlockQuote
} from '../presentational/Blockquote'
import {
  Map
} from '../presentational/map'
import AvatarBox from '../presentational/AvatarBox'

const getNameImage = (name) => {
  if (!name) return ''
  const [ firstName, lastName ] = name.split(' ')

  const firstChar = firstName.charAt(0)
  let lastChar = ''

  if (lastName) {
    lastChar = lastName.charAt(0)
  }
  return `${firstChar.toUpperCase()}${lastChar}`
}

const NameAvatar = styled(Txt) `
  width: 380px;
  height: 380px;
  font-size: 300px;
  text-align: center;
  background: white;
`

export const render = ({
  config, ...props
}) => {
  const {
    envVars: {
      googleMapsKey: apiKey
    }
  } = config

  return (
    <Flex flexDirection="column" width="100%">
      <Box bg="primary.main" height="375px" width="100%">
        <Map
          apiKey={apiKey}
          markers={[
            {
              lat: props.lat,
              lng: props.lng
            }
          ]}
        />
      </Box>
      <Box
        marginTop="-172px"
        style={{
          zIndex: 1
        }}
      >
        <Container>
          <Flex>
            <Flex width={380} flexDirection="column">
              <AvatarBox>
                {props.avatar ? (
                  <Img
                    src={props.avatar}
                    style={{
                      width: 380
                    }}
                  />
                ) : (
                  <NameAvatar>{getNameImage(props.name)}</NameAvatar>
                )}
              </AvatarBox>
              <Flex flexDirection="column">
                <Heading.h3
                  fontSize="34px"
                  style={{
                    fontWeight: 400
                  }}
                  pt={4}
                  pb={1}
                >
                  {props.name}
                </Heading.h3>
                <Txt fontSize="14px" pb={3} color="text.light">
                  @{props.handle}
                </Txt>
                <BlockQuote py={1}>{props.hardProblem}</BlockQuote>
                <Txt fontSize="14px">My hard problem to solve at balena</Txt>
              </Flex>
            </Flex>
            <Flex
              flexDirection="column"
              pt="245px"
              style={{
                flex: 1
              }}
              pl={'100px'}
            >
              <Flex align="center" justifyContent="space-between">
                <Box width={1 / 3}>
                  <Txt bold>
                    <Txt.span pr={2} color="primary.main">
                      <FontAwesomeIcon icon={faUserCircle} />
                    </Txt.span>
                    Nickname
                  </Txt>
                  <Txt>{props.nickname}</Txt>
                </Box>
                <Box width={1 / 3}>
                  <Txt bold>
                    <Txt.span pr={2} color="primary.main">
                      <FontAwesomeIcon icon={faLightbulb} />
                    </Txt.span>
                    Pronouns
                  </Txt>
                  <Txt>{props.pronouns || ''}</Txt>
                </Box>
                <Box width={1 / 3}>
                  <Txt bold>
                    <Txt.span pr={2} color="primary.main">
                      <FontAwesomeIcon icon={faAt} />
                    </Txt.span>
                    Handle
                  </Txt>
                  <Txt>@{props.handle}</Txt>
                </Box>
              </Flex>
              <Divider type="dashed" />

              <Flex flexDirection="column">
                <Box>
                  <Txt bold>
                    <Txt.span pr={2} color="primary.main">
                      <FontAwesomeIcon icon={faStar} />
                    </Txt.span>
                    Haves
                  </Txt>
                </Box>
                <Flex flexWrap="wrap">
                  {props.haves &&
                    props.haves.map((currentSkill) => {
                      return (
                        <Box width={1 / 3} key={currentSkill}>
                          <Txt>
                            <li>{currentSkill}</li>
                          </Txt>
                        </Box>
                      )
                    })}
                </Flex>
              </Flex>
              <Divider type="dashed" />
              <Flex flexDirection="column">
                <Box>
                  <Txt bold>
                    <Txt.span pr={2} color="primary.main">
                      <FontAwesomeIcon icon={faFlagCheckered} />
                    </Txt.span>
                    Wants
                  </Txt>
                </Box>
                <Flex flexWrap="wrap">
                  {props.wants &&
                    props.wants.map((expectedSkill) => {
                      return (
                        <Box width={1 / 3} key={expectedSkill}>
                          <Txt>
                            <li>{expectedSkill}</li>
                          </Txt>
                        </Box>
                      )
                    })}
                </Flex>
              </Flex>
              <Divider type="dashed" />

              <Flex flexDirection="column">
                <Box>
                  <Txt bold>
                    <Txt.span pr={2} color="primary.main">
                      <FontAwesomeIcon icon={faFootballBall} />
                    </Txt.span>
                    Short Bio
                  </Txt>
                </Box>
                <Txt.p>{props.shortBio}</Txt.p>
                <Txt.span fontSize={2} color="primary.dark" italic>
                  {props.interests || ''}
                </Txt.span>
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Flex>
  )
}

export default {
  render
}
