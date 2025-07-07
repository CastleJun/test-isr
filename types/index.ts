export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type Comment = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}; 