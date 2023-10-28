import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay:number)