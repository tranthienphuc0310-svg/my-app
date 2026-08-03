"use client";

type Props = {
  children: React.ReactNode;
};

export default function ClientProvider({ children }: Props) {
  return <>{children}</>;
}
