# Contributing to [PROJECT_NAME]

Thank you for your interest in contributing to [PROJECT_NAME]! We welcome contributions from the community.

## 🌐 Language / 언어

Feel free to communicate in **English** or **Korean (한국어)** — we support both!

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Code Style Guidelines](#code-style-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)

## 📜 Code of Conduct

This project adheres to our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 🤝 How Can I Contribute?

### Reporting Bugs

- Use the bug report template when creating an issue
- Check if the issue already exists before creating a new one
- Include as much detail as possible (steps to reproduce, expected vs actual behavior, environment details)

### Suggesting Enhancements

- Use the feature request template
- Clearly describe the problem and proposed solution
- Explain why this enhancement would be useful

### Asking Questions

- Use the question template for general questions
- Check existing issues and documentation first
- For quick questions, consider using GitHub Discussions if enabled

### Code Contributions

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test your changes thoroughly
5. Commit your changes (see [Commit Message Guidelines](#commit-message-guidelines))
6. Push to your fork (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 🛠 Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/[PROJECT_NAME].git
cd [PROJECT_NAME]

# Add upstream remote
git remote add upstream https://github.com/MUIN/[PROJECT_NAME].git

# Install dependencies
[PACKAGE_MANAGER_INSTALL_COMMAND]

# Run tests
[TEST_COMMAND]
```

## 🎨 Code Style Guidelines

### General Principles

- Write clear, readable code
- Follow the principle of least surprise
- Keep functions small and focused
- Write self-documenting code with descriptive names
- Add comments for complex logic, not obvious code

### Language-Specific Guidelines

**JavaScript/TypeScript:**
- Use ESLint and Prettier (config included)
- 2 spaces for indentation
- Use `const` by default, `let` when reassignment needed
- Prefer async/await over raw promises
- Use meaningful variable names (avoid single letters except in short loops)

**Python:**
- Follow PEP 8
- Use Black for formatting
- Type hints for function signatures
- Docstrings for all public functions/classes

**Go:**
- Follow standard Go conventions
- Run `gofmt` and `golint`
- Keep exported functions documented

### Documentation

- Update README.md if you change functionality
- Add inline comments for complex logic
- Update API documentation if you change interfaces
- Include examples for new features

## 💬 Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates, etc.
- `ci`: CI/CD changes

### Examples

```bash
feat: add webhook support for real-time notifications
fix: resolve memory leak in connection pooling
docs: update API documentation for v2.0
refactor: simplify authentication middleware
```

### Korean commits are also welcome!

```bash
feat: 실시간 알림을 위한 웹훅 지원 추가
fix: 연결 풀링의 메모리 누수 해결
```

## 🔀 Pull Request Process

1. **Before submitting:**
   - Ensure your code follows the style guidelines
   - Run all tests and ensure they pass
   - Update documentation as needed
   - Rebase on latest main branch

2. **PR Description:**
   - Use the PR template
   - Link related issues (use "Fixes #123" or "Closes #123")
   - Describe what changed and why
   - Include screenshots for UI changes
   - List breaking changes if any

3. **Review Process:**
   - At least one maintainer review required
   - Address all feedback or explain why you disagree
   - Keep discussions respectful and constructive
   - Be patient — maintainers review in their free time

4. **After Approval:**
   - Squash commits if requested
   - Maintainers will merge when ready

## 📝 Issue Guidelines

### Before Creating an Issue

- Search existing issues to avoid duplicates
- Check if it's already fixed in the latest version
- Gather all relevant information

### Creating a Good Issue

- Use the appropriate template
- Write a clear, descriptive title
- Provide complete information
- Be respectful and constructive
- Follow up on questions from maintainers

### Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Documentation improvements
- `good first issue`: Good for newcomers
- `help wanted`: Community help appreciated
- `question`: Further information requested
- `wontfix`: Won't be worked on

## 🙏 Recognition

Contributors will be recognized in:
- Project README
- Release notes for significant contributions
- GitHub contributor graph

Thank you for contributing to [PROJECT_NAME]! 🎉

---

**Questions?** Feel free to ask in issues or discussions.

*Built with ❤️ by the MUIN community*
