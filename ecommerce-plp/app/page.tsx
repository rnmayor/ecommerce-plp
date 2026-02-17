import { Button } from '@ecommerce/ui';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Button>Test</Button>
      <Button variant="outline">Test</Button>
      <Button variant="secondary">Test</Button>
      <Button variant="ghost">Test</Button>
      <Button variant="destructive">Test</Button>
      <Button variant="link">Test</Button>
      <Button size="xs">Test</Button>
      <Button size="sm">Test</Button>
      <Button size="lg">Test</Button>
      <Button size="icon">Test</Button>
      <Button size="icon-xs">Test</Button>
      <Button size="icon-sm">Test</Button>
      <Button size="icon-lg">Test</Button>
    </div>
  );
}
