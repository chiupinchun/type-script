import React, { FC } from 'react';

interface FieldProps {
  range: [number, number]
  position: [number, number, number]
}
const Field: FC<FieldProps> = ({ range, position }) => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={position} receiveShadow>
      <planeGeometry args={range} />
      <meshStandardMaterial color={0x00ff00} />
    </mesh>
  )
}

interface Props extends FieldProps {
  FieldItem: FC<{ range: [number, number] }>
}
const GrassField: FC<Props> = ({ FieldItem, ...fieldProps }) => {
  const numberOfItems = fieldProps.range[0] * fieldProps.range[1] / 5

  return (
    <group>
      {[...Array(numberOfItems)].map((_, index) => (
        <FieldItem range={fieldProps.range} key={index} />
      ))}
      <Field {...fieldProps} />
    </group>
  );
};

export default GrassField