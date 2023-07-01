import { atom } from 'jotai';

export interface fooBar {
  foo: string;
  bar: string;
}

//-----------------------------------------------------------------------------
// Atom
//-----------------------------------------------------------------------------
export const dataFooBar = atom<fooBar>({foo: "init", bar: "init"});

//-----------------------------------------------------------------------------
// WIP: async Actions to fetch and update data
//-----------------------------------------------------------------------------
export const fetchFooBar = async () => {
  const response = await fetch('/foobar');
  const data = await response.json();
  dataFooBar.setState(data);
};

export const updateData = async (newData) => {
  // Perform update logic and save to backend
  dataFooBar.setState(newData);
};
