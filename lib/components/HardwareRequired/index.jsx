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
  Box, Container, Heading
} from 'rendition'
import {
  Markdown
} from 'rendition/dist/extra/Markdown'

export const render = (props) => {
  return (
    <Box my={100}>
      <Container>
        <Heading.h2 mb={24}>Hardware Required</Heading.h2>
        <Box
          style={{
            maxWidth: 800
          }}>
          <Markdown>{props.hardwareRequired}</Markdown>
        </Box>
      </Container>
    </Box>
  )
}

export default {
  render
}
