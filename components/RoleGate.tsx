// components/RoleGate.tsx
"use client";

import { useEffect, useState } from "react";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

/**
 * Blocks access unless rb_role matches requiredRole.
 * Renders a server-action <form> so the user can switch roles in one click.
 *
 * NOTE: You must set the form's action from the page:
 *   <RoleGate requiredRole="tenant" actionHref="/app/app/actions#setActiveRoleAction">
 *     ...protected content...
 *   </RoleGate>
 *
 * Since we can't import a server action inside a client component,
 * we expose a <slot/> for the form "action" (passed in as a prop).
 */
export default function RoleGate({
  requiredRole,
  action,
  children,
}: {
  requiredRole: "tenant" | "landlord" | "admin";
  // server action: (formData: FormData) => Promise<void>
  action: (formData: FormData) => void | Promise<void>;
  children: React.ReactNode;
}) {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(readCookie("rb_role"));
    const id = setInterval(() => setRole(readCookie("rb_role")), 1200);
    return () => clearInterval(id);
  }, []);

  if (role !== requiredRole) {
    return (
      <div className="rounded-2xl border bg-white/5 border-white/10 p-4 text-sm">
        <div className="font-semibold mb-1">
          Switch to <span className="capitalize">{requiredRole}</span> to view this page
        </div>
        <div className="opacity-80">
          Your current role is <code className="bg-black/30 px-1 rounded">{role || "unknown"}</code>.
        </div>
        <form action={action} className="mt-3">
          <input type="hidden" name="role" value={requiredRole} />
          <button
            type="submit"
            className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-semibold"
          >
            Switch to {requiredRole}
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
