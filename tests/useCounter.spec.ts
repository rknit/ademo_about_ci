import { renderHook, act } from '@testing-library/react';
import useCounter from '../src/hooks/features/homepage/useCounter';

describe('useCounter hook', () => {
  it('should initialize count to 0 and val to 1', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
    expect(result.current.val).toBe(1);
  });

  it('should increment count by val when increment is called', () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);

    act(() => result.current.setVal(5));
    act(() => result.current.increment());
    expect(result.current.count).toBe(6);
  });

  it('should allow setting a new value for val', () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current.setVal(3));
    expect(result.current.val).toBe(3);
  });

  it('should increment multiple times correctly', () => {
    const { result } = renderHook(() => useCounter());
    
    // Increment 3 times with default val (1)
    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.increment();
    });
    expect(result.current.count).toBe(3);
  });

  it('should handle zero val correctly', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => result.current.setVal(0));
    act(() => result.current.increment());
    expect(result.current.count).toBe(0);
    expect(result.current.val).toBe(0);
  });

  it('should handle negative val correctly', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => result.current.setVal(-2));
    act(() => result.current.increment());
    expect(result.current.count).toBe(-2);
    expect(result.current.val).toBe(-2);
  });

  it('should handle decimal val correctly', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => result.current.setVal(0.5));
    act(() => {
      result.current.increment();
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
    expect(result.current.val).toBe(0.5);
  });

  it('should maintain independent state across multiple hook instances', () => {
    const { result: result1 } = renderHook(() => useCounter());
    const { result: result2 } = renderHook(() => useCounter());
    
    act(() => {
      result1.current.setVal(5);
      result2.current.setVal(3);
    });

     act(() => {
      result1.current.increment();
      result2.current.increment();
    });
    
    expect(result1.current.count).toBe(5);
    expect(result1.current.val).toBe(5);
    expect(result2.current.count).toBe(3);
    expect(result2.current.val).toBe(3);
  });

  it('should return the correct function references', () => {
    const { result } = renderHook(() => useCounter());
    
    expect(typeof result.current.increment).toBe('function');
    expect(typeof result.current.setVal).toBe('function');
    expect(typeof result.current.count).toBe('number');
    expect(typeof result.current.val).toBe('number');
  });

  it('should handle large numbers correctly', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => result.current.setVal(1000000));
    act(() => result.current.increment());
    
    expect(result.current.count).toBe(1000000);
    expect(result.current.val).toBe(1000000);
  });
});