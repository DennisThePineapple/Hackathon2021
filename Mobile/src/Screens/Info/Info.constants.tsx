import { MaterialType } from 'API/Responses';
import React from 'react';
import Colours from 'Theme/Colours';
import { BodyFont, TitleFont } from 'Theme/Fonts';
import * as Styles from './Info.styles';

const InfoObjects: Record<MaterialType, React.ReactNode> = {
	cardboard: <></>,
	glass: <></>,
	metal: (
		<>
			<Styles.HeroImage
				source={{
					uri: 'https://media.apnarm.net.au/media/images/2018/04/21/imagev12f6cc0ab56c6bd0569ff2c5a5cca0039-ftvfwzjhsydhv1m25q2_ct768x610.jpg',
				}}
			/>
			<BodyFont>
				Steel and aluminium are incredibly practical resources, and can be found in a range of applications
				including drink cans, buildings, cars, airplanes and more. The production of new aluminium and steel
				products is draining on our natural resources and contributes to increased greenhouse gases. Aluminium
				and steel products are 100% recyclable and require less energy to produce than virgin products.
			</BodyFont>
			<Styles.BinType colour={Colours.accent}>
				Recycle your metals in the <TitleFont colour={Colours.yellow}>YELLOW</TitleFont> bin
			</Styles.BinType>
		</>
	),
	organic: <></>,
	paper: <></>,
	plastic: <></>,
	waste: <></>,
};

export default InfoObjects;
