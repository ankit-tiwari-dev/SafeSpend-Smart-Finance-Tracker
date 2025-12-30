# Contributing to SafeSpend

First off, thank you for considering contributing to SafeSpend! It's people like you that make SafeSpend such a great tool.

## 🎯 Code of Conduct

This project and everyone participating in it is governed by our commitment to creating a welcoming and inclusive environment. By participating, you are expected to uphold this standard.

## 🚀 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** to demonstrate the steps
- **Describe the behavior you observed** and what you expected
- **Include screenshots** if relevant
- **Include your environment details** (OS, browser, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful**
- **List any alternative solutions** you've considered

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Follow the coding style** of the project
3. **Write clear commit messages**
4. **Update documentation** as needed
5. **Test your changes** thoroughly
6. **Submit your pull request**

## 💻 Development Setup

### Prerequisites

- Node.js 20+
- MongoDB
- Git

### Setup Steps

1. Fork and clone the repository
```bash
git clone https://github.com/your-username/safespend.git
cd safespend
```

2. Install dependencies
```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

3. Set up environment variables (see README.md)

4. Start development servers
```bash
# Backend (Terminal 1)
cd server
npm run dev

# Frontend (Terminal 2)
cd client
npm run dev
```

## 📝 Coding Standards

### JavaScript/React

- Use **ES6+ syntax**
- Follow **React Hooks** best practices
- Use **functional components** over class components
- Implement **proper error handling**
- Write **meaningful variable names**
- Add **comments for complex logic**

### Code Style

- Use **ESLint** configuration provided
- Format code with **Prettier**
- Use **2 spaces** for indentation
- Use **single quotes** for strings
- Add **semicolons**

### Component Structure

```jsx
// 1. Imports
import { useState, useEffect } from 'react';
import ComponentName from './ComponentName';

// 2. Component definition
const MyComponent = (props) => {
  // 3. Hooks
  const [state, setState] = useState(null);
  
  // 4. Effects
  useEffect(() => {
    // Effect logic
  }, []);
  
  // 5. Event handlers
  const handleClick = () => {
    // Handler logic
  };
  
  // 6. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

// 7. Export
export default MyComponent;
```

### CSS/Styling

- Use **Tailwind CSS** utility classes
- Follow the **theme system** (CSS variables)
- Avoid **inline styles** unless necessary
- Use **semantic class names**
- Maintain **responsive design**

### Git Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(budgets): add budget export functionality
fix(auth): resolve Google OAuth callback error
docs(readme): update installation instructions
style(dashboard): improve card spacing
refactor(api): optimize database queries
```

## 🧪 Testing

- Write **unit tests** for utility functions
- Test **API endpoints** with sample data
- Verify **UI components** render correctly
- Test **responsive design** on multiple devices
- Check **theme switching** functionality
- Validate **form inputs** and error handling

## 📚 Documentation

- Update **README.md** for new features
- Add **JSDoc comments** for functions
- Update **API documentation** for endpoint changes
- Include **examples** in documentation
- Keep **changelog** updated

## 🔍 Code Review Process

1. **Self-review** your code before submitting
2. **Address feedback** from reviewers promptly
3. **Keep PRs focused** on a single feature/fix
4. **Respond to comments** professionally
5. **Update your PR** based on feedback

## 🎨 Design Guidelines

- Follow the **SafeSpend design language**
- Maintain **institutional aesthetic**
- Use **theme colors** consistently
- Implement **smooth transitions**
- Ensure **accessibility** (WCAG 2.1)
- Test in **both themes** (light and dark)

## 📦 Release Process

1. Version bump in `package.json`
2. Update `CHANGELOG.md`
3. Create release notes
4. Tag the release
5. Deploy to production

## 🤝 Community

- Be **respectful** and **constructive**
- Help **newcomers** get started
- Share **knowledge** and **best practices**
- Participate in **discussions**
- Report **security issues** privately

## 📧 Contact

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and ideas
- **Email**: dev@safespend.app (for sensitive matters)

## 📄 License

By contributing to SafeSpend, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to SafeSpend!** 💎

Your efforts help make financial management better for everyone.
