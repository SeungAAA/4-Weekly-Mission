import { StringLiteral } from '@babel/types';

export type SampleLinkRawData = {
  id: number;
  createdAt: string;
  url: string;
  description: string;
  imageSource: string;
  title: string;
};

export type LinkRawData = {
  id: number;
  created_at: string;
  updated_at: string;
  url: string;
  image_source: string;
  title: string;
  description: string;
  folder_id: number;
};

export type Link = {
  id: number;
  title: string;
  url: string;
  imageSource: string;
  alt: string;
  description: string;
  elapsedTime: string;
  createdAt: string;
};
