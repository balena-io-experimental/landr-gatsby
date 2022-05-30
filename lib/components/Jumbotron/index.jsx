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

import React from 'react';
import styled from 'styled-components';
import { Box, Button, Container, Txt, Flex, Heading, useTheme, Link, Img as RImg } from 'rendition';

import Terminal from '../presentational/terminal';
import { DeployWithBalena } from '../presentational/deploy-with-balena';

const Img = styled.img`
	border-radius: 10px;
	max-width: 800px;
	margin: 0 auto;
	width: 100%;
	box-shadow: 0px 7px 12px 4px #00000052;
`;

const Screenshot = ({ src }) => {
	return (
		<Txt align="center">
			<Img src={src} alt="screenshot" />
		</Txt>
	);
};

const Jumbotron = (props) => {
	const theme = useTheme();
	const commands = props.steps || [];
	return (
		<Box pt={5} pb={6}>
			<Container maxWidth={998}>
				<Flex flexDirection="column" alignItems="center" mb={40}>
					{props.logoBrandMark && <RImg width="64px" mb={3} src={`${props.logoBrandMark}`} />}
					{!props.bannerText && (
						<Heading.h1 color={theme.colors.primary.main} fontSize="38px">
							{props.title}
						</Heading.h1>
					)}
					{props.description &&
						(props.bannerText ? (
							<Heading.h1
								fontSize={5}
								align="center"
								style={{
									lineHeight: 1.34,
									maxWidth: 800,
								}}>
								{props.description}
							</Heading.h1>
						) : (
							<Heading.h2
								fontSize={24}
								align="center"
								style={{
									maxWidth: 800,
								}}>
								{props.description}
							</Heading.h2>
						))}
				</Flex>
				{(props.isCli && commands.length) > 0 && <Terminal commands={commands} />}
				{props.screenshot && <Screenshot src={props.screenshot} />}
				{(props.action || props.deployWithBalenaUrl) && (
					<Txt
						style={{
							display: 'flex',
							alignItems: 'flex-end',
							justifyContent: 'center',
						}}
						align="center"
						mt={40}>
						{props.deployWithBalenaUrl && (
							<DeployWithBalena mt={2} m={2} deployUrl={props.deployWithBalenaUrl} />
						)}
						{props.action && (
							<Link m={2} blank href={props.action}>
								<Button primary>
									<Txt.span
										style={{
											fontWeight: 'bold',
										}}>
										Getting Started Guide
									</Txt.span>
								</Button>
							</Link>
						)}
					</Txt>
				)}
			</Container>
		</Box>
	);
};

export default Jumbotron;
